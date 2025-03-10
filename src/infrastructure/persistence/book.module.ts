import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from '../../application/services/book.service';
import { BookCreateUseCase } from '../../application/use-cases/book-create.use-case';
import { BookEditUseCase } from '../../application/use-cases/book-edit.use-case';
import { BookDeleteUseCase } from '../../application/use-cases/book-delete.use-case';
import { BookController } from '../controllers/book.controller';
import { Book } from '../../domain/entities/book.entity';
import { ManageBooksUseCase } from '../../application/use-cases/manage-books.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [
    BookService,
    ManageBooksUseCase,
    BookCreateUseCase,
    BookEditUseCase,
    BookDeleteUseCase,
  ],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
