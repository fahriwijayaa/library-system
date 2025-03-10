import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../../domain/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageBooksUseCase {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async getAllBooks() {
    return this.bookRepo.find();
  }
}
