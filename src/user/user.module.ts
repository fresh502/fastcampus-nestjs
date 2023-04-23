import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const UserMockService = {
  findAll: () => {
    return 'find mock users';
  },
};
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useValue: UserMockService,
    },
  ],
})
export class UserModule {}
