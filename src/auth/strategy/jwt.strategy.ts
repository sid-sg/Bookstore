import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload : { userId: number; email: string }){
        const userFound =  await this.prisma.user.findUnique({
            where: {
                id: payload.userId
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            }
        });

        if(!userFound){
            return null;
        }

        return userFound;
    }
}