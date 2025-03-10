import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../domain/entities/member.entity';
import { Book } from '../../domain/entities/book.entity';
import { Borrow } from '../../domain/entities/borrow.entity';
import { BorrowBookUseCase } from '../../application/use-cases/borrow-book.use-case';
import { ReturnBookUseCase } from '../../application/use-cases/return-book.usecase';
import { ManageBorrowsUseCase } from '../../application/use-cases/manage-borrows.usecase';
import { BorrowController } from '../controllers/borrow.controller';
import { BorrowService } from '../../application/services/borrow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Book, Borrow])],
  providers: [
    BorrowBookUseCase,
    ReturnBookUseCase,
    ManageBorrowsUseCase,
    BorrowService,
  ],
  controllers: [BorrowController],
  exports: [
    BorrowService,
    BorrowBookUseCase,
    ReturnBookUseCase,
    ManageBorrowsUseCase,
  ],
})
export class BorrowModule {}
