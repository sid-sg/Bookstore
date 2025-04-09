import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    allBooks(){
        return this.booksService.allBooks();
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Get('id')
    // getBook(){
    //     return this.booksService.getBook();
    // }

    @UseGuards(AuthGuard('jwt'))
    @Post('new')
    newBook(){
        return this.booksService.newBook();
    }


    // @UseGuards(AuthGuard('jwt'))
    // @Patch('update')
    // updateBook(){
    //     return this.booksService.updateBook();
    // }

    // @UseGuards(AuthGuard('jwt'))
    // @Delete('delete')
    // deleteBook(){
    //     return this.booksService.deleteBook();
    // }
}
