import type { TaskStatus } from '../task.model';

export class TasksFilterDto {
  public status?: TaskStatus;
  public search?: string;
}
