import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BookDto } from '../../application/dto/book.dto';
import { BookService } from '../../application/services/book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('books')
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Post('addBook')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bookCode: { type: 'string' },
        bookTitle: { type: 'string' },
        bookAuthor: { type: 'string' },
      },
    },
  })
  createBook(@Body() bookDto: BookDto) {
    return this.bookService.createBook(bookDto);
  }

  @Put('editBook/:code')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bookTitle: { type: 'string' },
        bookAuthor: { type: 'string' },
      },
    },
  })
  editBook(@Param('code') code: string, @Body() bookDto: BookDto) {
    return this.bookService.editBook(code, bookDto);
  }

  @Delete('deleteBook/:code')
  deleteBook(@Param('code') code: string) {
    return this.bookService.deleteBook(code);
  }
}
