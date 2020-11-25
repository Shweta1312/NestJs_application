import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTo {
  
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
