import { Injectable } from '@nestjs/common';
import { MemberCreateUseCase } from '../use-cases/member-create.use-case';
import { MemberDto } from '../dto/member.dto';
import { MemberEditUseCase } from '../use-cases/member-edit.use-case';
import { MemberDeleteUseCase } from '../use-cases/member-delete.use-case';
import { ManageMembersUseCase } from '../use-cases/manage-members.usecase';
import { UpdateMemberPenaltyUseCase } from '../use-cases/update-member-penalty.use-case';

@Injectable()
export class MemberService {
  constructor(
    private manageMembersUseCase: ManageMembersUseCase,
    private memberCreateUseCase: MemberCreateUseCase,
    private memberEditUseCase: MemberEditUseCase,
    private memberDeleteUseCase: MemberDeleteUseCase,
    private memberUpdatePenaltyUseCase: UpdateMemberPenaltyUseCase,
  ) {}

  getAllMembers() {
    return this.manageMembersUseCase.getAllMembers();
  }

  createMember(dto: MemberDto) {
    return this.memberCreateUseCase.execute(dto);
  }

  editMember(code: string, name: string) {
    return this.memberEditUseCase.execute(code, name);
  }

  deleteMember(code: string) {
    return this.memberDeleteUseCase.execute(code);
  }

  updatePenalties() {
    return this.memberUpdatePenaltyUseCase.updatePenalties();
  }
}
