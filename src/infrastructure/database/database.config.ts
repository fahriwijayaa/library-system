import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Book } from '../../domain/entities/book.entity';
import { Member } from '../../domain/entities/member.entity';
import { Borrow } from '../../domain/entities/borrow.entity'; // Sesuaikan path!

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3306),
  username: configService.get<string>('DB_USER', 'root'),
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_NAME', 'library_system'),
  entities: [Member, Book, Borrow],
  synchronize: process.env.NODE_ENV !== 'production', // Nonaktifkan di production
  logging: configService.get<string>('NODE_ENV') === 'development',
});
