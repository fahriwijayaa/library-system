import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/domain/entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberEditUseCase {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
  ) {}

  async execute(code: string, name: string) {
    const findMember = await this.memberRepo.findOne({ where: { code } });

    if (!findMember) {
      throw new BadRequestException(
        `Member dengan kode ${code} tidak ditemukan`,
      );
    }

    // Update data member
    findMember.name = name;

    return this.memberRepo.save(findMember);
  }
}
