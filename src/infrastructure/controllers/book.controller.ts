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
import { BookDto } from 'src/application/dto/book.dto';
import { BookService } from 'src/application/services/book.service';

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
  createMember(@Body() bookDto: BookDto) {
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
  editMember(@Param('code') code: string, @Body() bookDto: BookDto) {
    return this.bookService.editBook(code, bookDto);
  }

  @Delete('deleteBook/:code')
  deleteMember(@Param('code') code: string) {
    return this.bookService.deleteBook(code);
  }
}
