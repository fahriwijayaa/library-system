import { Test, TestingModule } from '@nestjs/testing';
import { BorrowController } from './borrow.controller';
import { BorrowService } from '../../application/services/borrow.service';
import { BorrowBookDto, ReturnBookDto } from '../../application/dto/borrow.dto';

describe('BorrowController', () => {
  let borrowController: BorrowController;
  let borrowService: BorrowService;

  const mockBorrowService = {
    borrowBook: jest.fn(),
    returnBook: jest.fn(),
    getAllBorrows: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowController],
      providers: [
        {
          provide: BorrowService,
          useValue: mockBorrowService,
        },
      ],
    }).compile();

    borrowController = module.get<BorrowController>(BorrowController);
    borrowService = module.get<BorrowService>(BorrowService);
  });

  it('should be defined', () => {
    expect(borrowController).toBeDefined();
  });

  describe('borrowBook', () => {
    it('should call borrowService.borrowBook and return the result', async () => {
      const dto: BorrowBookDto = { memberCode: 'MEM001', bookCode: 'BOOK001' };
      const result = { message: 'Book borrowed successfully' };
      mockBorrowService.borrowBook.mockResolvedValue(result);

      const response = await borrowController.borrowBook(dto);
      expect(response).toEqual(result);
      expect(mockBorrowService.borrowBook).toHaveBeenCalledWith(dto);
    });
  });

  describe('returnBook', () => {
    it('should call borrowService.returnBook and return the result', async () => {
      const dto: ReturnBookDto = { memberCode: 'MEM001', bookCode: 'BOOK001' };
      const result = { message: 'Book returned successfully' };
      mockBorrowService.returnBook.mockResolvedValue(result);

      const response = await borrowController.returnBook(dto);
      expect(response).toEqual(result);
      expect(mockBorrowService.returnBook).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAllBorrows', () => {
    it('should call borrowService.getAllBorrows and return the result', async () => {
      const result = [
        { memberCode: 'MEM001', bookCode: 'BOOK001', borrowDate: '2025-03-01' },
      ];
      mockBorrowService.getAllBorrows.mockResolvedValue(result);

      const response = await borrowController.getAllBorrows();
      expect(response).toEqual(result);
      expect(mockBorrowService.getAllBorrows).toHaveBeenCalled();
    });
  });
});
