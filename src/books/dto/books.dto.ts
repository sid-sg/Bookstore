import { Type } from "class-transformer";
import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Decimal } from "generated/prisma/runtime/library";

export class newBookDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNumber()
    @IsNotEmpty()
    // @Type(()=>Number)
    price: number;
    
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(5)
    // @Type(()=>Number)
    rating?: number;
    
    @IsDate()
    @IsNotEmpty()
    @Type(()=>Date)
    publishedDate: Date;

    @IsString()
    @IsNotEmpty()
    isbn: string;
}