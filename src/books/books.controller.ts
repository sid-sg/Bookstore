import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import { newBookDto } from './dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    allBooks(){
        return this.booksService.allBooks();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getBook(@Param('id') id: string){
        return this.booksService.getBook(parseInt(id));
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('new')
    newBook(@Body() dto: newBookDto){
        return this.booksService.newBook(dto);
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
