import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './taskEnum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './taskEntity';
import { filter } from 'rxjs';
import GetTasksFilterDto from './dto/filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filteDto: GetTasksFilterDto):  Promise<Task[]> {
    return this.taskService.getTasks(filteDto);
  }
  // /////param pra qnd for procurar pela url exemplo e o body pra qnd for post e injetar bagulho
  @Get('/:id')
  getTaskId(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskId(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): string {
    this.taskService.deleteTask(id);
    return 'Deleted task with id: ' + id;
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ):  Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }
}
