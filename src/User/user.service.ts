import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../DB/Entities/user.entity';
import { Repository } from 'typeorm';
import { UserInputModel } from '../Auth/DTO/user.input.model';
import * as bcrypt from 'bcrypt';
import { UserModel } from './Model/user.model';
import { UserProfileView } from './DTO/user.profile.view';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userModel: UserModel,
  ) {}

  async getUserByUsernameOrEmail({
    username,
    email = '',
  }: {
    username: string;
    email?: string;
  }): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: [{ username }, { email }],
    });
  }

  async createUser(user: UserInputModel): Promise<UserEntity> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, passwordSalt);

    const newUser = this.userRepository.create({
      ...user,
      password_salt: passwordSalt,
      password: passwordHash,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUserById(id: string): Promise<UserProfileView> {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.userModel.mapUserToProfileInfoView(user);
  }

  async updateUserById(id: string, updateData: UserProfileView) {
    const user = await this.userRepository.update({ id }, { ...updateData });
    return user.affected > 0 ? updateData : null;
  }
}
