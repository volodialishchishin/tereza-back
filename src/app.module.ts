import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './DB/Entities/user.entity';
import { UserRoleEntity } from './DB/Entities/user.role.entity';
import { UserSettingsEntity } from './DB/Entities/user.settings.entity';
import { SessionEntity } from './DB/Entities/session.entity';
import { UserModule } from './User/user.module';
import { RoadModule } from './road/road.module';
import { RoadEntity } from './DB/Entities/road.entity';
import { ChatModule } from './chat/chat.module';
import { RideModule } from './ride/ride.module';
import { RideEntity } from './DB/Entities/ride.entity';
import { MessageEntity } from './DB/Entities/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    RoadModule,
    ChatModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        port: 5432,
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        ssl: true,
        entities: [
          UserEntity,
          UserRoleEntity,
          UserSettingsEntity,
          SessionEntity,
          RoadEntity,
          RideEntity,
          MessageEntity,
        ],
      }),
      inject: [ConfigService],
    }),
    RoadModule,
    ChatModule,
    RideModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
