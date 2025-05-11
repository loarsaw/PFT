export interface Task {
  _id: string;
  taskId: string;
  title: string;
  status: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}