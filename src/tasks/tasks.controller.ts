import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

import type { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import type { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public getTasks(@Query() filterDto: TasksFilterDto) {
    if (Object.keys(filterDto).length > 0) {
      return this.tasksService.getTasksWithFilter(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  public getOneTask(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createTask(@Body() createDto: CreateTaskDto) {
    return this.tasksService.createTask(createDto);
  }

  @Patch(':id/status')
  public updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.updateTask(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }
}
