import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

// UserService를 테스트하는 코드
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // 각각의 Test 하나 : it
  it('findByEma', () => {
    expect(service).toBeDefined();
  });
});
