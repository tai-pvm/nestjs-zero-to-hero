import { Test } from '@nestjs/testing';

import { Task } from './entities';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOneBy: jest.fn()
});

const mockTasks: Array<Task> = [
  {
    id: 'someId',
    title: 'Test title',
    description: 'Test description',
    status: TaskStatus.TODO,
    user: {
      id: 'userId',
      username: 'Ariel',
      password: 'password',
      tasks: []
    }
  }
];

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository }
        // TasksRepository
      ]
    }).compile();

    tasksService = moduleRef.get(TasksService);
    tasksRepository = moduleRef.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      jest.spyOn(tasksRepository, 'getTasks').mockResolvedValue(mockTasks);
      const result = await tasksService.getTasks({}, mockTasks[0].user);

      expect(result).toEqual(mockTasks);
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOneBy and return the result', async () => {
      jest.spyOn(tasksRepository, 'findOneBy').mockResolvedValue(mockTasks[0]);
      const result = await tasksService.getTaskById(
        mockTasks[0].id,
        mockTasks[0].user
      );
      expect(result).toEqual(mockTasks[0]);
    });

    // it('calls TasksRepository.findOneBy and handles the error', async () => {
    //   tasksRepository.findOneBy();
    // });
  });
});
