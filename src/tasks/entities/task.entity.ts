import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../users/entities';

import { TaskStatus } from '../task-status.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column('text')
  public description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  public status: TaskStatus;

  @ManyToOne(() => User, user => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  public user: User;
}
