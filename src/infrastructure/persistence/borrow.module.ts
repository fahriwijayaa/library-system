import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/domain/entities/member.entity';
import { Book } from 'src/domain/entities/book.entity';
import { Borrow } from 'src/domain/entities/borrow.entity';
import { BorrowBookUseCase } from 'src/application/use-cases/borrow-book.use-case';
import { ReturnBookUseCase } from 'src/application/use-cases/return-book.usecase';
import { ManageBorrowsUseCase } from 'src/application/use-cases/manage-borrows.usecase';
import { BorrowController } from '../controllers/borrow.controller';
import { BorrowService } from 'src/application/services/borrow.service';

// @Module({
//   imports: [TypeOrmModule.forFeature([Member, Book, Borrow])],
//   providers: [BorrowBookUseCase, ReturnBookUseCase, ManageBorrowsUseCase],
//   exports: [BorrowBookUseCase, ReturnBookUseCase, ManageBorrowsUseCase],
// })
// export class BorrowModule {}

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
