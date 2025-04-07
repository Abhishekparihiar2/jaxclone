import { Task } from "../shared/model";

export class TaskPageState {
  openTask?: {
    data: Task[];
    count: number;
  };
  closeTask?: {
    data: Task[];
    count: number;
  }

  constructor(data: any){
    this.openTask = data?.openTask || [];
    this.closeTask = data?.closeTask || [];
  }
}