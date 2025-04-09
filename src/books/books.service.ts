import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { newBookDto, updatedBookDto } from './dto';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService){}

    async allBooks(){
        try{
            const books = await this.prisma.book.findMany();

            return {
                "Books": books
            }
        }
        catch(e){
            console.log(e);
            return new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async newBook(dto: newBookDto){
        const bookExist = await this.prisma.book.findUnique({
            where:{
                isbn: dto.isbn 
            }
        });

        if(bookExist){
            return new HttpException('Book already exists', HttpStatus.CONFLICT);
        }
        try{

            const newBook = await this.prisma.book.create({
                data: {
                    isbn: dto.isbn,
                    title: dto.title,
                    author: dto.author,
                    category: dto.category,
                    price: dto.price,
                    rating: dto.rating,
                    publishedDate: dto.publishedDate,
                }
            });

            return{
                'message': 'New book created',
                'New book': newBook
            }
        }
        catch(e){
            console.log(e);
            return new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);            
        }
    }

    async getBook(id: number){
        const book = await this.prisma.book.findUnique({
            where:{
                id: id
            }
        });
        if(!book){
            return new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }

        return {
            'Book': book
        }
    }

    async updateBook(id: number, dto: updatedBookDto){
        const book = await this.prisma.book.findUnique({
            where:{
                id: id
            }
        });
        if(!book){
            return new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }

        try{
            const updatedBook = await this.prisma.book.update({
                where: {
                    id: id
                },
                data:{
                    ...dto
                }
            });

            return {
                'message': 'Book updated',
                'Updated book': updatedBook
            }
        }
        catch(e){
            console.log(e);
            return new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteBook(id: number){
        const book = await this.prisma.book.findUnique({
            where:{
                id: id
            }
        });
        if(!book){
            return new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }

        const deletedBook = await this.prisma.book.delete({
            where:{
                id: id
            }
        });

        return {
            'message': 'Book deleted',
            'Deleted book': deletedBook
        }
    }

    async filterBooks(author?: string, category?: string, rating?: number){
        const filters:{author?: string, category?: string, rating?: {gte: number}} = {}

        if(author) filters.author = author;
        if(category) filters.category = category;
        if(rating) filters.rating = { gte: rating };

        const filteredBooks = await this.prisma.book.findMany({
            where: {
                ...filters
            }
        });

        return filteredBooks;
    }
    
    async searchBooks(title: string){
        const filteredBooks = await this.prisma.book.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive'
                }
            }
        });
        return filteredBooks;
    }

}
