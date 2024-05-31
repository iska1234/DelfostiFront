export interface IProyecto {
  id?: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  responsible: number;
  state?: string;
  fullname?:string;
}
