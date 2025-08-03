import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this.httpClient.get('https://fakestoreapi.com/products');
  }
   getSpecificProduct(id: number): Observable<any> {
    return this.httpClient.get(`https://fakestoreapi.com/products/${id}`);
  }
}
