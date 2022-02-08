import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import GetTasksFilterDto from './dto/filter.dto';
import { Task } from './taskEntity';
import { TaskStatus } from './taskEnum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = await this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await this.delete(id);
    if (!this.findOne(id)) {
      throw new Error(`Task with ID "${id}" not found`);
    }
  }

  async getTasks(filteDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filteDto;
    const query = this.createQueryBuilder('task');

    if (status) {
        query.andWhere('task.status = :status', { status });
    }

    if (search) {
        query.andWhere(
            'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.discription) LIKE LOWER(:search)',
            { search: `%${search}%` });
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
