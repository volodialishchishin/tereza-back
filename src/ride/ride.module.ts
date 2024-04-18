import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideEntity } from '../DB/Entities/ride.entity';

@Module({
  controllers: [RideController],
  providers: [RideService],
  imports: [TypeOrmModule.forFeature([RideEntity])],
})
export class RideModule {}
