import { IsDate, IsDecimal, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

    @IsDecimal()
    @IsNotEmpty()
    price: number;
    
    @IsDecimal()
    @IsOptional()
    rating?: number;
    
    @IsDate()
    @IsNotEmpty()
    publishedDate: Date;
}