import { Status } from './enums';

export interface User {
  id: string;
  name: string;
  password?: string;
  status: Status;
  createdAt: Date;
}