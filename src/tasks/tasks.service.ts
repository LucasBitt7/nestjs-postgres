import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskEnum';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './taskRepository';
import { Task } from './taskEntity';
import GetTasksFilterDto from './dto/filter.dto';
///aqui gera as funcoes motherfocka
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {

  }

  getTasks(filteDto: GetTasksFilterDto):  Promise<Task[]> {
    return this.taskRepository.getTasks(filteDto);
  }

   createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskId(id: string): Promise<Task> { 
    const found = await this.taskRepository.findOne(id);

    if(!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }
  
  deleteTask(id: string): void {
    this.taskRepository.deleteTask(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskId(id);
    task.status = status;

    await this.taskRepository.save(task);

    return task;
  }
}
