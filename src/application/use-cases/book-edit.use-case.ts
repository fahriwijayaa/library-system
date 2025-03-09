import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/domain/entities/book.entity';
import { Repository } from 'typeorm';
import { BookDto } from '../dto/book.dto';

@Injectable()
export class BookEditUseCase {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async execute(code: string, dto: BookDto) {
    const findBook = await this.bookRepo.findOne({ where: { code } });

    if (!findBook) {
      throw new BadRequestException(`Buku dengan kode ${code} tidak ditemukan`);
    }

    // Update data buku
    findBook.title = dto.bookTitle;
    findBook.author = dto.bookAuthor;

    return this.bookRepo.save(findBook);
  }
}
