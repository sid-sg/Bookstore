import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { newBookDto } from './dto';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService){}

    allBooks(){
        return "All books";
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
            }
        }
        catch(e){
            console.log(e);
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);            
        }
    }

    // updateBook(){
    //     return "Update book";
    // }

    // deleteBook(){
    //     return "Delete book";
    // }
}
