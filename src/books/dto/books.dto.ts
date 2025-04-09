import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class newBookDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(5)
    rating?: number;
    
    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Type(()=>Date)
    publishedDate: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    isbn: string;
}

export class updatedBookDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    author?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price?: number;
    
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(5)
    rating?: number;
    
    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(()=>Date)
    publishedDate?: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    isbn?: string;
}