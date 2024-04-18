import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RideEntity } from '../DB/Entities/ride.entity';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(RideEntity)
    private rideEntityRepository: Repository<RideEntity>,
  ) {}
  create(createRideDto: CreateRideDto) {
    const ride = this.rideEntityRepository.create({
      user_count: createRideDto.userCount,
      description: createRideDto.description,
      title: createRideDto.title,
      road_id: createRideDto.roadId,
    });
    const rideEntity = this.rideEntityRepository.save(ride);
    return rideEntity;
  }

  findAll() {
    return this.rideEntityRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} ride`;
  }

  update(id: number, updateRideDto: UpdateRideDto) {
    return `This action updates a #${id} ride`;
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
}
