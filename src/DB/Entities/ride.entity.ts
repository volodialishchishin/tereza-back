import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RoadEntity } from './road.entity';
@Entity()
export class RideEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true })
  user_count: number;

  @Column({ type: 'varchar' })
  road_id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => RoadEntity, (road) => road.rides)
  road: RoadEntity;
}
