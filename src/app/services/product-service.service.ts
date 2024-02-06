import { OrderItem } from './../entities/OderItem';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Product } from '../entities/Product';
import { CarItem } from '../entities/CarItem';
import { CarOrder } from '../entities/CarOrder';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private urlEndpoint: string = 'http://localhost:8000/api/v1';
  constructor(private http: HttpClient) {}
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

  getProductos(): Observable<any> {
    return this.http.get(`${this.urlEndpoint}/products`, { headers: this.httpHeaders }).pipe(
      map((response: any) => {
        (response.data as Product[]).map((cliente) => {
          return cliente;
        });
        return response;
      })
    );
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.urlEndpoint}/products/${id}`, { headers: this.httpHeaders }).pipe(
      map((response: any) => {
        return response.data as Product;
      })
    );
  }

  getSummary(items: CarItem[]): Observable<any> {
    let orderItems = items.map((item) => {
      return {
        id: item.product.id,
        quantity: item.quantity,
      };
    }).filter((item) => {
      return item.quantity > 0
    })
    let data = {"products": orderItems};
    console.log(this.httpHeaders);
    return this.http.post(`${this.urlEndpoint}/cars/summary`, data, { headers: this.httpHeaders }).pipe(
      tap((response: any) => {
        console.log(response);
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  sendOder(order: CarOrder): Observable<any> {
    let products = order.items.map((item) => {
      return {
        id: item.product.id,
        quantity: item.quantity,
      };
    }).filter((item) => {
      return item.quantity > 0
    })
    order.products.push(...products);
    return this.http.post(`${this.urlEndpoint}/cars/order`, order, { headers: this.httpHeaders }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(e => {
        Swal.fire(e.error.message, e.error.error, e.type)
        return throwError(e);
      })
    );
  }
}
