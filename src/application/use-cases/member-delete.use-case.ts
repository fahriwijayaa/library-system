import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../domain/entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberDeleteUseCase {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
  ) {}

  async execute(code: string) {
    const findMember = await this.memberRepo.findOne({ where: { code } });

    if (!findMember) {
      throw new BadRequestException(
        `Member dengan kode ${code} tidak ditemukan`,
      );
    }

    // Hapus member
    await this.memberRepo.delete({ code });

    return { message: `Member dengan kode ${code} berhasil dihapus` };
  }
}
