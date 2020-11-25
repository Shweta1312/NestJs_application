import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTo } from './dto/create-task.dto';
import { GetTasksFilterDTo } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  // getTasksWithFilters(filterDto: GetTasksFilterDTo){
  //   const {status, search} = filterDto;
  //   let tasks = this.getAllTasks();
  //   if(status){
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if(search){
  //     tasks = tasks.filter(task =>
  //       task.title.includes(search) ||
  //       task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if(!found){
  //     throw new NotFoundException(`Task with ${id} not found`);
  //   }
  //   return found;
  // }
  // //CLient will give the title and desciption of task
  // createTask(createTaskDto: CreateTaskDTo): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
