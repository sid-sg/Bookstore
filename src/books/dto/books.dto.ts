import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

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
    price: number;
    
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(5)
    rating?: number;
    
    @IsDate()
    @IsNotEmpty()
    @Type(()=>Date)
    publishedDate: Date;

    @IsString()
    @IsNotEmpty()
    isbn: string;
}

export class updatedBookDto{
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsNumber()
    price?: number;
    
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(5)
    rating?: number;
    
    @IsOptional()
    @IsDate()
    @Type(()=>Date)
    publishedDate?: Date;

    @IsOptional()
    @IsString()
    isbn?: string;
}