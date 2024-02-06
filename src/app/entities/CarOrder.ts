import { CarItem } from "./CarItem";

export interface CarOrder {
  client_name: string;
  client_phone: string;
  client_email: string;
  items: CarItem[];
  products: any[]
}
