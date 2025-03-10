import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from '../../application/services/book.service';
import { BookDto } from '../../application/dto/book.dto';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  const mockBookService = {
    getAllBooks: jest.fn(),
    createBook: jest.fn(),
    editBook: jest.fn(),
    deleteBook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [{ provide: BookService, useValue: mockBookService }],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });

  it('should return all books', async () => {
    mockBookService.getAllBooks.mockResolvedValue([]);
    expect(await bookController.getAllBooks()).toEqual([]);
  });

  it('should create a book', async () => {
    const dto: BookDto = {
      bookCode: 'B001',
      bookTitle: 'Book 1',
      bookAuthor: 'Author 1',
    };
    mockBookService.createBook.mockResolvedValue(dto);
    expect(await bookController.createBook(dto)).toEqual(dto);
  });

  it('should edit a book', async () => {
    const dto: BookDto = {
      bookTitle: 'Updated Title',
      bookAuthor: 'Updated Author',
    };
    mockBookService.editBook.mockResolvedValue(dto);
    expect(await bookController.editBook('B001', dto)).toEqual(dto);
  });

  it('should delete a book', async () => {
    mockBookService.deleteBook.mockResolvedValue({ message: 'Book deleted' });
    expect(await bookController.deleteBook('B001')).toEqual({
      message: 'Book deleted',
    });
  });
});
