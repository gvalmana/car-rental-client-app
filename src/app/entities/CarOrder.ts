import { CarItem } from "./CarItem";

export interface CarOrder {
  id: number;
  client_name: string;
  client_phone: string;
  client_email: string;
  date: Date;
  total: number;
  items: CarItem[];
  products: any[]
}
