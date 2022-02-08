import { TaskStatus } from "../taskEnum";

export default class GetTasksFilterDto {
  status: TaskStatus;
  search: string;
}