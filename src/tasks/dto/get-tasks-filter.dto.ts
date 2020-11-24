import { TaskStatus } from '../task.model';
export class GetTasksFilterDTo {
  status: TaskStatus;
  search: string;
}
