import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  public getAllTasks() {
    return this.tasks;
  }

  public getTasksWithFilter(filterDto: TasksFilterDto) {
    const { status, search } = filterDto;

    let filteredTasks = this.getAllTasks();

    if (status) {
      filteredTasks = filteredTasks.filter(item => item.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks.filter(task => {
        const isTitleIncludesSearch = task.title.toLocaleLowerCase().includes(search);
        const isDescriptionIncludesSearch = task.description.toLocaleLowerCase().includes(search);

        return isTitleIncludesSearch || isDescriptionIncludesSearch;
      });
    }
    return filteredTasks;
  }

  public getTaskById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  public createTask(createDto: CreateTaskDto) {
    const { title, description } = createDto;

    const newTask: Task = {
      id: randomUUID(),
      title,
      description,
      status: TaskStatus.TODO
    };

    this.tasks.push(newTask);
    return newTask;
  }

  public updateTask(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
    }
    return task;
  }

  public deleteTaskById(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
