// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
// } // deleted when we use DB

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRSS',
  DONE = 'DONE',
}
