import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';


export class SignupDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    plainPassword: string;
}


export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    plainPassword: string;
}
