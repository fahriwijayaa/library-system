import { Injectable } from '@nestjs/common';
import { BorrowBookDto, ReturnBookDto } from '../dto/borrow.dto';
import { BorrowBookUseCase } from '../use-cases/borrow-book.use-case';
import { ReturnBookUseCase } from '../use-cases/return-book.usecase';
import { ManageBorrowsUseCase } from '../use-cases/manage-borrows.usecase';

@Injectable()
export class BorrowService {
  constructor(
    private borrowBookUseCase: BorrowBookUseCase,
    private returnBookUseCase: ReturnBookUseCase,
    private manageBorrowsUseCase: ManageBorrowsUseCase,
  ) {}

  borrowBook(dto: BorrowBookDto) {
    return this.borrowBookUseCase.execute(dto);
  }

  returnBook(dto: ReturnBookDto) {
    return this.returnBookUseCase.execute(dto);
  }

  getAllBorrows() {
    return this.manageBorrowsUseCase.getAllBorrows();
  }
}
