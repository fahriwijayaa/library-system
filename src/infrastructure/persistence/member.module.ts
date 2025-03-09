import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/domain/entities/member.entity';
import { MemberCreateUseCase } from 'src/application/use-cases/member-create.use-case';
import { MemberService } from 'src/application/services/member.service';
import { MemberController } from '../controllers/member.controller';
import { MemberEditUseCase } from 'src/application/use-cases/member-edit.use-case';
import { MemberDeleteUseCase } from 'src/application/use-cases/member-delete.use-case';
import { ManageMembersUseCase } from 'src/application/use-cases/manage-members.usecase';
import { UpdateMemberPenaltyUseCase } from 'src/application/use-cases/update-member-penalty.use-case';

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
