import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/domain/entities/member.entity';
import { Book } from 'src/domain/entities/book.entity';
import { Borrow } from 'src/domain/entities/borrow.entity';
import { IsNull, Repository } from 'typeorm';
import { BorrowBookDto, ReturnBookDto } from '../dto/borrow.dto';

@Injectable()
export class ReturnBookUseCase {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepo: Repository<Borrow>,
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async execute(dto: ReturnBookDto) {
    const record = await this.borrowRepo.findOne({
      where: {
        book: { code: dto.bookCode },
        member: { code: dto.memberCode },
        returnDate: IsNull(),
      },
      relations: ['member', 'book'],
    });

    if (!record) throw new BadRequestException('Peminjaman tidak ditemukan');

    record.returnDate = new Date();
    const diffDays = Math.floor(
      (record.returnDate.getTime() - record.borrowDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    // TES 7 Day
    // record.returnDate = new Date();
    // record.returnDate.setDate(record.returnDate.getDate() + 8); // Tambah 8 hari

    // const diffDays = Math.floor(
    //   (record.returnDate.getTime() - record.borrowDate.getTime()) /
    //     (1000 * 60 * 60 * 24),
    // );

    if (diffDays > 7) {
      record.member.hasPenalty = true;
      record.member.penaltyUntil = new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000,
      );
      await this.memberRepo.save(record.member);
    }

    record.book.stock += 1;
    await this.bookRepo.save(record.book);

    return this.borrowRepo.save(record);
  }
}
