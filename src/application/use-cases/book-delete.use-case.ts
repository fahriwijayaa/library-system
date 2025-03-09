import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/domain/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookDeleteUseCase {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async execute(code: string) {
    const findMember = await this.bookRepo.findOne({ where: { code } });

    if (!findMember) {
      throw new BadRequestException(`Buku dengan kode ${code} tidak ditemukan`);
    }

    // Hapus member
    await this.bookRepo.delete({ code });

    return { message: `Buku dengan kode ${code} berhasil dihapus` };
  }
}
