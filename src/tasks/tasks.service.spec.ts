import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDTo } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTo } from './dto/create-task.dto';

const mockUser = { id: 12, username: 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      //checking whether the getTasks method returns a value or not
      taskRepository.getTasks.mockResolvedValue('Some value');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTasksFilterDTo = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };
      //call tasksService.getTasks
      const result = await tasksService.getTasks(filters, mockUser);

      //expect taskRepository.getTasks TO HAVE BEEN CALLED
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('Some value');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
      const mockTask = { title: 'Test task', description: 'Test description' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });

    it('throws an error as task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow();
    });
  });

  describe('createTask', () => {
    it('creates task by calling the taskRepository.createTask()', async () => {

      taskRepository.createTask.mockResolvedValue('Some value');
      const taskDto: CreateTaskDTo = {
        title: 'Test title',
        description: 'Test description'
      }
      const result = await tasksService.createTask(taskDto,mockUser);
      expect(taskRepository.createTask).toHaveBeenCalled();
      expect(result).toEqual('Some value');
    })
  })
});
