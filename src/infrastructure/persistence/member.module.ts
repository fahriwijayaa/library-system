import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../domain/entities/member.entity';
import { MemberCreateUseCase } from '../../application/use-cases/member-create.use-case';
import { MemberService } from '../../application/services/member.service';
import { MemberController } from '../controllers/member.controller';
import { MemberEditUseCase } from '../../application/use-cases/member-edit.use-case';
import { MemberDeleteUseCase } from '../../application/use-cases/member-delete.use-case';
import { ManageMembersUseCase } from '../../application/use-cases/manage-members.usecase';
import { UpdateMemberPenaltyUseCase } from '../../application/use-cases/update-member-penalty.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [
    MemberService,
    ManageMembersUseCase,
    MemberCreateUseCase,
    MemberEditUseCase,
    MemberDeleteUseCase,
    UpdateMemberPenaltyUseCase,
  ],
  controllers: [MemberController],
  exports: [MemberService],
})
export class MemberModule {}
