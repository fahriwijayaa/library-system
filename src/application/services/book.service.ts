import { Injectable } from '@nestjs/common';
import { BookDto } from '../dto/book.dto';
import { BookCreateUseCase } from '../use-cases/book-create.use-case';
import { BookDeleteUseCase } from '../use-cases/book-delete.use-case';
import { BookEditUseCase } from '../use-cases/book-edit.use-case';
import { ManageBooksUseCase } from '../use-cases/manage-books.usecase';

@Injectable()
export class BookService {
  constructor(
    private manageBooksUseCase: ManageBooksUseCase,
    private bookCreateUseCase: BookCreateUseCase,
    private bookEditUseCase: BookEditUseCase,
    private bookDeleteUseCase: BookDeleteUseCase,
  ) {}

  getAllBooks() {
    return this.manageBooksUseCase.getAllBooks();
  }

  createBook(dto: BookDto) {
    return this.bookCreateUseCase.execute(dto);
  }

  editBook(code: string, dto: BookDto) {
    return this.bookEditUseCase.execute(code, dto);
  }

  deleteBook(code: string) {
    return this.bookDeleteUseCase.execute(code);
  }
}
