export interface Employee {
  active: unknown;
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string; 
  performance: number; 
  manager?: string;
  isActive: boolean;
  location?: string;
}