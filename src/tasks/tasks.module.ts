import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/auth/auth.module';

import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository]
})
export class TasksModule {}
