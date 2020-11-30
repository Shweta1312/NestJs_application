import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTo } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTo } from './dto/get-tasks-filter.dto';
import { User } from '../auth/auth.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { error } from 'console';

@EntityRepository(Task)

export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');
  async getTasks(filterDto: GetTasksFilterDTo, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.user = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    try{
      const tasks = await query.getMany();
      return tasks;
    }catch(error){
      this.logger.error(`Failed to get tasks for user ${user.username}, DTO: ${filterDto}`,error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDTo, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try{
      await task.save();
    }catch(error){
      this.logger.error(`Failed to create a task for user ${user.username},  Data: ${createTaskDto}`)
      throw new InternalServerErrorException();
    }
    

    delete task.user;
    return task;
  }
}
