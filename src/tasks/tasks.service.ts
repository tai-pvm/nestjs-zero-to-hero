import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@/users/entities';

import type { CreateTaskDto, TasksFilterDto } from './dto';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  public getTasks(filterDto: TasksFilterDto, user: User) {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  public async getTaskById(id: string, user: User) {
    const task = await this.tasksRepository.findOneBy({ id, user });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  public createTask(createTaskDto: CreateTaskDto, user: User) {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  public async updateTaskStatus(id: string, status: TaskStatus, user: User) {
    const task = await this.getTaskById(id, user);
    task.status = status;

    await this.tasksRepository.save(task);
    return task;
  }

  public async deleteTask(id: string, user: User) {
    const { affected } = await this.tasksRepository.delete({ id, user });

    if (!affected || affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
