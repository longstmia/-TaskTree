import { makeAutoObservable } from "mobx";

export interface Task {
  id: string;
  title: string;
  isChecked: boolean;
  subTasks: Task[];
}

export class TaskStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      isChecked: false,
      subTasks: [],
    };
    this.tasks.push(newTask);
  }

  addSubTask(parentTaskId: string, subTaskTitle: string) {
    const parentTask = this.findTaskById(parentTaskId);
    if (parentTask) {
      const newSubTask: Task = {
        id: Math.random().toString(),
        title: subTaskTitle,
        isChecked: false,
        subTasks: [],
      };
      parentTask.subTasks.push(newSubTask);
    }
  }

  toggleTask(task: Task, isChecked: boolean) {
    task.isChecked = isChecked;
    task.subTasks.forEach((subTask) => this.toggleTask(subTask, isChecked));
    const parentTask = this.findParentTask(task.id);
    if (parentTask) this.updateParentTaskStatus(parentTask);
  }

  updateParentTaskStatus(parentTask: Task) {
    parentTask.isChecked = parentTask.subTasks.every(
      (subTask) => subTask.isChecked
    );
  }

  findTaskById(id: string, tasks: Task[] = this.tasks): Task | null {
    for (const task of tasks) {
      if (task.id === id) {
        return task;
      }
      const found = this.findTaskById(id, task.subTasks);
      if (found) {
        return found;
      }
    }
    return null;
  }

  findParentTask(id: string, tasks: Task[] = this.tasks): Task | null {
    for (const task of tasks) {
      if (task.subTasks.some((subTask) => subTask.id === id)) {
        return task;
      }
      const found = this.findParentTask(id, task.subTasks);
      if (found) {
        return found;
      }
    }
    return null;
  }
}

export const taskStore = new TaskStore();
