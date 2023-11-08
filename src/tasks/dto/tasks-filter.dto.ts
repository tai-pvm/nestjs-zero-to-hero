import { IsEnum, IsOptional, IsString } from 'class-validator';

import { TaskStatus } from '../task-status.enum';

export class TasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  public status?: TaskStatus;

  @IsOptional()
  @IsString()
  public search?: string;
}
