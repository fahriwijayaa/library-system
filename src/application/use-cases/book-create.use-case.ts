import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/domain/entities/book.entity';
import { BookDto } from '../dto/book.dto';

@Injectable()
export class BookCreateUseCase {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async execute(dto: BookDto) {
    // Cek apakah kode atau nama member sudah ada
    const findBook = await this.bookRepo.findOne({
      where: [{ code: dto.bookCode }, { title: dto.bookTitle }],
    });

    if (findBook) {
      throw new BadRequestException(
        `Buku dengan kode ${dto.bookCode} atau judul ${dto.bookTitle} sudah ada`,
      );
    }

    // Buat member baru
    const newBook = this.bookRepo.create({
      code: dto.bookCode,
      title: dto.bookTitle,
      author: dto.bookAuthor,
      stock: 1,
    });

    return this.bookRepo.save(newBook);
  }
}
