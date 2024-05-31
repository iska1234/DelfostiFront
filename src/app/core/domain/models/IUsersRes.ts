export interface IUsersRes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  age: number;
  projectid: number;
  projectname?: string;
  created_at: string;
  updated_at: string;
}
