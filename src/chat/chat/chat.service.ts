import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../../DB/Entities/message.entity';
import { UserEntity } from '../../DB/Entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageEntityRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}
  private users = [];

  addUser({ name, room }) {
    const isExist = this.users.some(
      (user) => user.name === name && user.room === room,
    );
    let user = this.users.find(
      (user) => user.name === name && user.room === room,
    );
    if (!user) {
      user = { id: Math.random().toString(), name, room };
      this.users.push(user);
    }
    return { user, isExist };
  }

  findUser(params) {
    return this.users.find((user) => user.name === params.name);
  }

  getRoomUsers(room) {
    return this.users.filter((user) => user.room === room);
  }

  removeUser(params) {
    const index = this.users.findIndex((user) => user.id === params.userId);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
  }

  async getMessages(room) {
    const messages = await this.messageEntityRepository.find({
      where: { ride_id: room },
    });
    return messages.map((e) => {
      return {
        user: { name: e.name },
        message: e.message,
      };
    });
  }

  saveMessage(name, message, room) {
    const savedMessage = this.messageEntityRepository.create({
      name,
      message,
      ride_id: room,
    });
    return this.messageEntityRepository.save(savedMessage);
  }
}
