import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from 'src/domain/entities/member.entity';

@Injectable()
export class UpdateMemberPenaltyUseCase {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
  ) {}

  async updatePenalties() {
    const currentDate = new Date();

    // Cari anggota yang masih dalam masa penalti
    const membersWithPenalty = await this.memberRepo.find({
      where: { hasPenalty: true },
    });

    for (const member of membersWithPenalty) {
      if (member.penaltyUntil) {
        // Normalisasi tanggal menjadi format YYYY-MM-DD
        const penaltyDate = new Date(member.penaltyUntil);
        const penaltyDateOnly = new Date(
          penaltyDate.getFullYear(),
          penaltyDate.getMonth(),
          penaltyDate.getDate(),
        );
        const currentDateOnly = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
        );

        // Bandingkan tanggal tanpa waktu
        if (penaltyDateOnly <= currentDateOnly) {
          // Jika tanggal penalti sudah lewat, reset status penalti
          member.hasPenalty = false;
          member.penaltyUntil = null;
          await this.memberRepo.save(member);
        }
      }
    }

    return {
      message: 'Penalti anggota telah diperbarui',
    };
  }
}
