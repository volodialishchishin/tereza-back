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

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
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
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
