import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  article_id: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @CreateDateColumn({ type: 'varchar', nullable: true })
  createdat: string;
}
