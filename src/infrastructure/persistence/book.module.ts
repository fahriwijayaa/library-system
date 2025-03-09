import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from 'src/application/services/book.service';
import { BookCreateUseCase } from 'src/application/use-cases/book-create.use-case';
import { BookEditUseCase } from 'src/application/use-cases/book-edit.use-case';
import { BookDeleteUseCase } from 'src/application/use-cases/book-delete.use-case';
import { BookController } from '../controllers/book.controller';
import { Book } from 'src/domain/entities/book.entity';
import { ManageBooksUseCase } from 'src/application/use-cases/manage-books.usecase';

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
