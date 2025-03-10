import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../domain/entities/member.entity';
import { Repository } from 'typeorm';
import { MemberDto } from '../dto/member.dto';

@Injectable()
export class MemberCreateUseCase {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
  ) {}

  async execute(dto: MemberDto) {
    // Cek apakah kode atau nama member sudah ada
    const findMember = await this.memberRepo.findOne({
      where: [{ code: dto.memberCode }, { name: dto.memberName }],
    });

    if (findMember) {
      throw new BadRequestException(
        `Member dengan kode ${dto.memberCode} atau nama ${dto.memberName} sudah ada`,
      );
    }

    // Buat member baru
    const newMember = this.memberRepo.create({
      code: dto.memberCode,
      name: dto.memberName,
    });

    return this.memberRepo.save(newMember);
  }
}
