import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../DB/Entities/user.entity';
import { UserService } from '../User/user.service';
import { UserController } from './user.controller';
import { UserModel } from './Model/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserModel],
  exports: [UserService, UserModel],
})
export class UserModule {}
