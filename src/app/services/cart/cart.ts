import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, forkJoin } from 'rxjs';
import { ICartItem } from '../../interfaces/IcartItem';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartServer = 'http://localhost:3000/cart';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getCart(): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>(this.cartServer);
  }

  addNewItem(item: ICartItem): Observable<ICartItem> {
    return this.http.post<ICartItem>(this.cartServer, item);
  }

  updateItem(item: ICartItem): Observable<ICartItem> {
    return this.http.put<ICartItem>(`${this.cartServer}/${item.id}`, item);
  }

  deleteCartItem(item: ICartItem): Observable<any> {
    return this.http.delete(`${this.cartServer}/${item.id}`);
  }

  clearCart(): Observable<any> {
    return this.getCart().pipe(
      map((cart) => cart.map((item) => this.deleteCartItem(item))),
      switchMap((deleteObservables) => forkJoin(deleteObservables))
    );
  }

  addToCart(product: any) {
    const productId = product.id.toString();
    this.getCart().subscribe((cart) => {
      const existing = cart.find((p) => p.id === productId);
      if (existing) {
        const updatedItem: ICartItem = {
          ...existing,
          quantity: existing.quantity + 1,
        };
        this.updateItem(updatedItem).subscribe(() => {
          this.toastr.success('Product added successfully', '', {
            timeOut: 1000,
          });
        });
      } else {
        const newItem: ICartItem = {
          id: productId,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        };
        this.addNewItem(newItem).subscribe(() => {
          this.toastr.success('Product added successfully', '', {
            timeOut: 1000,
          });
        });
      }
    });
  }
}
