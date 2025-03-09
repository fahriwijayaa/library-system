import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { MemberDto } from 'src/application/dto/member.dto';
import { MemberService } from 'src/application/services/member.service';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('members')
  getAllMembers() {
    return this.memberService.getAllMembers();
  }

  @Post('addMember')
  createMember(@Body() memberDto: MemberDto) {
    return this.memberService.createMember(memberDto);
  }

  @Put('editMember/:code')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
  })
  editMember(@Param('code') code: string, @Body() body: { name: string }) {
    return this.memberService.editMember(code, body.name);
  }

  @Delete('deleteMember/:code')
  deleteMember(@Param('code') code: string) {
    return this.memberService.deleteMember(code);
  }

  @Post('update-penalties')
  async updatePenalties() {
    return this.memberService.updatePenalties();
  }
}
