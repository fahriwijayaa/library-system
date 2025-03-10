import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../domain/entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageMembersUseCase {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
  ) {}

  async getAllMembers() {
    const members = await this.memberRepo.find({ relations: ['borrows'] });
    return members.map((member) => ({
      code: member.code,
      name: member.name,
      borrowedBooks: member.borrows.filter((b) => !b.returnDate).length,
    }));
  }
}
