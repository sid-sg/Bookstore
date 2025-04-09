import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import { newBookDto, updatedBookDto } from './dto';

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


    @UseGuards(AuthGuard('jwt'))
    @Patch('update/:id')
    updateBook(@Param('id') id: string, @Body() dto: updatedBookDto){
        return this.booksService.updateBook(parseInt(id), dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    deleteBook(@Param('id') id: string){
        return this.booksService.deleteBook(parseInt(id));
    }
}
