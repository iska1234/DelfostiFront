export interface IProyecto {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  state: string;
  responsible: number;
  fullname?:string;
}
