import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';

class MockRepository {
  async findOneBy(query) {
    const user: User = new User();
    user.email = query.email;
    return user;
  }
}

describe('User', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  it('should', async () => {
    const email = 'nestjs@fastcampus.com';
    const result = await userService.findOneByEmail(email);
    expect(result.email).toBe(email);
  });
});
