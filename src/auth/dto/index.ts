import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class SignupDto {
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


export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    plainPassword: string;
}