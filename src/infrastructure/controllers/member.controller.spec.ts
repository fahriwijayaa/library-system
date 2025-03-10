import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from '../../application/services/member.service';
import { MemberDto } from '../../application/dto/member.dto';

describe('MemberController', () => {
  let memberController: MemberController;
  let memberService: MemberService;

  const mockMemberService = {
    getAllMembers: jest.fn().mockResolvedValue(['Member 1', 'Member 2']),
    createMember: jest.fn().mockImplementation((dto: MemberDto) => dto),
    editMember: jest.fn().mockResolvedValue({ message: 'Member updated' }),
    deleteMember: jest.fn().mockResolvedValue({ message: 'Member deleted' }),
    updatePenalties: jest
      .fn()
      .mockResolvedValue({ message: 'Penalties updated' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        {
          provide: MemberService,
          useValue: mockMemberService,
        },
      ],
    }).compile();

    memberController = module.get<MemberController>(MemberController);
    memberService = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(memberController).toBeDefined();
  });

  it('should get all members', async () => {
    const result = await memberController.getAllMembers();
    expect(result).toEqual(['Member 1', 'Member 2']);
  });

  it('should create a member', async () => {
    const dto: MemberDto = { memberCode: 'M001', memberName: 'John Doe' };
    const result = await memberController.createMember(dto);
    expect(result).toEqual(dto);
  });

  it('should edit a member', async () => {
    const result = await memberController.editMember('M001', {
      name: 'Jane Doe',
    });
    expect(result).toEqual({ message: 'Member updated' });
  });

  it('should delete a member', async () => {
    const result = await memberController.deleteMember('M001');
    expect(result).toEqual({ message: 'Member deleted' });
  });

  it('should update penalties', async () => {
    const result = await memberController.updatePenalties();
    expect(result).toEqual({ message: 'Penalties updated' });
  });
});

// Tes ini meng-cover semua metode utama di controller. Tinggal jalankan `npm run test` untuk lihat hasilnya! 🚀
