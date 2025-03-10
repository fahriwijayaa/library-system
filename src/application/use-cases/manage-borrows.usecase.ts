import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrow } from '../../domain/entities/borrow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageBorrowsUseCase {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepo: Repository<Borrow>,
  ) {}

  async getAllBorrows() {
    const borrows = await this.borrowRepo.find({
      relations: ['member', 'book'],
    });

    return borrows.map((borrow) => ({
      borrowId: borrow.id,
      memberCode: borrow.member?.code,
      memberName: borrow.member?.name,
      bookCode: borrow.book?.code,
      bookTitle: borrow.book?.title,
      borrowDate: borrow.borrowDate,
      returnDate: borrow.returnDate || 'Belum dikembalikan',
    }));
  }
}
