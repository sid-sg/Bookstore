import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService){}

    allBooks(){
        return "All books";
    }
    
    newBook(){
        return "New book";
    }

    // updateBook(){
    //     return "Update book";
    // }

    // deleteBook(){
    //     return "Delete book";
    // }
}
