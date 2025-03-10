import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../domain/entities/member.entity';
import { Book } from '../../domain/entities/book.entity';
import { Borrow } from '../../domain/entities/borrow.entity';
import { IsNull, Repository } from 'typeorm';
import { BorrowBookDto } from '../dto/borrow.dto';

@Injectable()
export class BorrowBookUseCase {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
    @InjectRepository(Borrow)
    private borrowRepo: Repository<Borrow>,
  ) {}

  async execute(dto: BorrowBookDto) {
    const member = await this.memberRepo.findOne({
      where: { code: dto.memberCode },
    });
    const book = await this.bookRepo.findOne({ where: { code: dto.bookCode } });

    if (!member || !book) {
      throw new BadRequestException('Member atau buku tidak ditemukan');
    }

    if (
      member.hasPenalty &&
      member.penaltyUntil &&
      member.penaltyUntil > new Date()
    ) {
      throw new BadRequestException('Member sedang dalam masa penalti');
    }

    const borrowedBooks = await this.borrowRepo.count({
      where: { member, returnDate: IsNull() },
    });

    if (borrowedBooks >= 2) {
      throw new BadRequestException('Member sudah meminjam 2 buku');
    }

    const alreadyBorrowed = await this.borrowRepo.findOne({
      where: { book, returnDate: IsNull() },
    });

    if (alreadyBorrowed) {
      throw new BadRequestException(
        'Buku ini sedang dipinjam oleh member lain',
      );
    }

    book.stock -= 1;
    await this.bookRepo.save(book);

    const newBorrow = this.borrowRepo.create({
      member,
      book,
      borrowDate: new Date(),
    });

    return this.borrowRepo.save(newBorrow);
  }
}
