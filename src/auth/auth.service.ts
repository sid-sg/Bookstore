import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as bcrypt from 'bcrypt';

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService){}

    async signup(dto: AuthDto){
        const userExist = await this.prisma.user.findUnique({
            where:{
                email: dto.email
            }
        });
        if(userExist){
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
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
            
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    signin(dto: AuthDto){
        return {
            'message': 'user signed in'
        };
    }
}