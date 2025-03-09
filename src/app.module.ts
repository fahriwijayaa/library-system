import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// Entities
import { Book } from './domain/entities/book.entity';
import { Member } from './domain/entities/member.entity';
import { Borrow } from './domain/entities/borrow.entity';

// Controllers
import { BorrowController } from './infrastructure/controllers/borrow.controller';

// Modules
import { BorrowModule } from './infrastructure/persistence/borrow.module';
import { MemberController } from './infrastructure/controllers/member.controller';
import { MemberModule } from './infrastructure/persistence/member.module';
import { BookModule } from './infrastructure/persistence/book.module';
import { BookController } from './infrastructure/controllers/book.controller';
import { databaseConfig } from './infrastructure/database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        databaseConfig(configService),
    }),
    MemberModule,
    BookModule,
    BorrowModule,
  ],
  controllers: [MemberController, BookController, BorrowController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.seedData();
  }

  private async seedData() {
    const memberRepo = this.dataSource.getRepository(Member);
    const bookRepo = this.dataSource.getRepository(Book);

    if ((await memberRepo.count()) === 0) {
      await memberRepo.save([
        { code: 'M001', name: 'Angga' },
        { code: 'M002', name: 'Ferry' },
        { code: 'M003', name: 'Putri' },
      ]);
    }

    if ((await bookRepo.count()) === 0) {
      await bookRepo.save([
        {
          code: 'JK-45',
          title: 'Harry Potter',
          author: 'J.K Rowling',
          stock: 1,
        },
        {
          code: 'SHR-1',
          title: 'A Study in Scarlet',
          author: 'Arthur Conan Doyle',
          stock: 1,
        },
        {
          code: 'TW-11',
          title: 'Twilight',
          author: 'Stephenie Meyer',
          stock: 1,
        },
        {
          code: 'HOB-83',
          title: 'The Hobbit, or There and Back Again',
          author: 'J.R.R. Tolkien',
          stock: 1,
        },
        {
          code: 'NRN-7',
          title: 'The Lion, the Witch and the Wardrobe',
          author: 'C.S. Lewis',
          stock: 1,
        },
      ]);
    }
  }
}
