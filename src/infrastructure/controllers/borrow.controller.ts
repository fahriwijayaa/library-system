import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BorrowBookDto, ReturnBookDto } from '../../application/dto/borrow.dto';
import { BorrowService } from '../../application/services/borrow.service';

@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        memberCode: { type: 'string' },
        bookCode: { type: 'string' },
      },
    },
  })
  borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    return this.borrowService.borrowBook(borrowBookDto);
  }

  @Post('return')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        memberCode: { type: 'string' },
        bookCode: { type: 'string' },
      },
    },
  })
  returnBook(@Body() returnBookDto: ReturnBookDto) {
    return this.borrowService.returnBook(returnBookDto);
  }

  @Get('getBorrows')
  getAllBorrows() {
    return this.borrowService.getAllBorrows();
  }
}
