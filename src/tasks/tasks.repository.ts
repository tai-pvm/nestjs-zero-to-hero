import {
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { User } from '@/users/entities';

import { CreateTaskDto, TasksFilterDto } from './dto';
import { Task } from './entities';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksRepository extends Repository<Task> {
  private readonly alias = 'task';
  private readonly logger = new Logger('TasksRepository', { timestamp: true });

  constructor(dataSource: DataSource) {
    super(Task, dataSource.manager);
  }

  public async getTasks(filterDto: TasksFilterDto, user: User) {
    const { status, search } = filterDto;

    const queryBuilder = this.createQueryBuilder(this.alias);
    queryBuilder.where({ user });

    if (status) {
      queryBuilder.andWhere(`${this.alias}.status = :status`, { status });
    }

    if (search) {
      queryBuilder.andWhere(
        new Brackets(builder =>
          builder
            .where(`${this.alias}.title ILIKE :search`, {
              search: `%${search}%`
            })
            .orWhere(`${this.alias}.description ILIKE :search`, {
              search: `%${search}%`
            })
        )
      );
    }

    try {
      const tasks = await queryBuilder.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${JSON.stringify(filterDto)}"`,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  public async createTask(createTaskDto: CreateTaskDto, user: User) {
    const { title, description } = createTaskDto;

    const newTask = this.create({
      title,
      description,
      status: TaskStatus.TODO,
      user
    });

    await this.save(newTask);

    return newTask;
  }
}
