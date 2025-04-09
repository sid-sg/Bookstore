import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignupDto, LoginDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService, private jwt: JwtService){}

    async signup(dto: SignupDto){
        const userExist = await this.prisma.user.findUnique({
            where:{
                email: dto.email
            }
        });
        if(userExist){
            return new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        try{

            const hashedPassword:string = await bcrypt.hash(dto.plainPassword, 10);
            
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    firstName: dto.firstName,
                    lastName : dto.lastName,
                    hashedPassword: hashedPassword
                }
            });
            
            return {
                'message': 'user signed up'
            };
        }
        catch(e){
            console.log(e);
            
            return new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async login(dto: LoginDto){
        const userExist = await this.prisma.user.findUnique({
            where:{
                email: dto.email
            }
        });
        if(!userExist){
            return new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
        }

        const passwordMatch = await bcrypt.compare(dto.plainPassword, userExist.hashedPassword);

        if(!passwordMatch){
            return new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
        }
       
        const token = await this.signJwt(userExist.id, userExist.email);
        
        return {
            'message': 'user logged in',
            'token': token,
        };
    }

    async signJwt(userId:number, email:string){
        const data = {
            userId: userId,
            email: email
        }

        const token = await this.jwt.signAsync(data, {
            secret: process.env.JWT_SECRET,
        });

        return token;
    }
}