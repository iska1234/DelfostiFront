export interface ITaskRes {
  taskid?: number;
  projectid: number;
  taskname: string;
  taskdescription: string;
  startdate: string;
  enddate: string;
  color?: string;
  advance?: number;
  state?: string;
  responsible: number;

}
