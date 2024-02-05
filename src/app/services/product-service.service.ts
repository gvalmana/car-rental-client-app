import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Product } from '../entities/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private urlEndpoint: string = 'http://localhost:8000/api/v1';
  constructor(private http: HttpClient) {}
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

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
}
