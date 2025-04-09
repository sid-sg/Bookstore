import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    plainPassword: string;
}