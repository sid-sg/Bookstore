import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import { newBookDto, updatedBookDto } from './dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService){}

    //not protected
    @ApiOkResponse({
        description: 'Books filtered on baseis of author, category & rating',
    })
    @Get('filter')
    filterBooks(@Query('author') author?:string, @Query('category') category?:string, @Query('rating') rating?:string){
        
        return this.booksService.filterBooks(author, category, parseFloat(rating || '0'));
    }
    
    @ApiOkResponse({
        description: 'Books found after searching title insensitively',
    })
    @Get('search')
    searchBooks(@Query('title') title:string){
        
        return this.booksService.searchBooks(title);
    }

    @ApiOkResponse({
        description: 'Books sorted on basis of price or rating in ascending or descending order',
    })
    @Get('sort')
    sortBooks(@Query('group') group:'price' | 'rating', @Query('order') order:'asc' | 'desc'){
        
        return this.booksService.sortBooks(group, order);
    }

    @ApiOkResponse({
        description: 'Books retuns based on pagination depending on total page limit and current page no.',
    })
    @Get('')
    allBooks(@Query('limit') limit?: string, @Query('page') page?:string){
        return this.booksService.allBooks(parseInt(limit || '10'), parseInt(page || '1'));
    }

    @ApiOkResponse({
        description: 'Book found based on id',
    })
    @Get(':id')
    getBook(@Param('id') id: string){
        return this.booksService.getBook(parseInt(id));
    }

    // protected

    @ApiOkResponse({
        description: 'New book entered',
    })
    @UseGuards(AuthGuard('jwt'))
    @Post('new')
    newBook(@Body() dto: newBookDto){
        return this.booksService.newBook(dto);
    }


    @ApiOkResponse({
        description: 'Book details updated',
    })
    @UseGuards(AuthGuard('jwt'))
    @Patch('update/:id')
    updateBook(@Param('id') id: string, @Body() dto: updatedBookDto){
        return this.booksService.updateBook(parseInt(id), dto);
    }

    @ApiOkResponse({
        description: 'Book deleted',
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    deleteBook(@Param('id') id: string){
        return this.booksService.deleteBook(parseInt(id));
    }

}
