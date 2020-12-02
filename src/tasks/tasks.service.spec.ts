import { Test } from "@nestjs/testing";
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDTo } from './dto/get-tasks-filter.dto';
import { TaskStatus } from "./task-status.enum";

const mockUser = { username: "Test user"};

const mockTaskRepository = () => ({
  getTasks : jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository}
      ]
    }).compile(); 

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it ('gets all tasks from the repository', async () => {
      //checking whether the getTasks method returns a value or not
      taskRepository.getTasks.mockResolvedValue('Some value');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters : GetTasksFilterDTo = { status: TaskStatus.IN_PROGRESS, search: "Some search query"};
      //call tasksService.getTasks
      const result = await tasksService.getTasks(filters, mockUser);

      //expect taskRepository.getTasks TO HAVE BEEN CALLED
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('Some value');
    })
  })
})