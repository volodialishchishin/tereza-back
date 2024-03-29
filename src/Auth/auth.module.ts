import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../DB/Entities/user.entity';
import { UserRoleEntity } from '../DB/Entities/user.role.entity';
import { UserSettingsEntity } from '../DB/Entities/user.settings.entity';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { SessionEntity } from '../DB/Entities/session.entity';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../User/user.service';
import { JwtStrategy } from './Strategy/jwt.strategy';
import { UserModel } from '../User/Model/user.model';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 1000,
          limit: 100,
        },
      ],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      UserRoleEntity,
      UserSettingsEntity,
      SessionEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    ConfigService,
    UserService,
    JwtStrategy,
    UserModel,
  ],
  exports: [AuthService, UserService],
})
export class AuthModule {}
