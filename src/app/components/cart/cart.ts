import { ChangeDetectorRef, Component } from '@angular/core';
import { ICartItem } from '../../interfaces/IcartItem';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart/cart';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cart: ICartItem[] = [];
  totalPrice: number = 0;

  constructor(
    public cartService: CartService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((items) => {
      this.cart = [...items];
      this.calculateTotalPrice();
      this.cdr.detectChanges();
    });
  }

  calculateTotalPrice() {
    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.totalPrice = +total.toFixed(2);
  }

  increaseQuantity(item: ICartItem) {
    item.quantity++;
    this.cartService.updateItem(item).subscribe(() => {
      this.loadCart();
      this.toastr.success('Quantity updated successfully', '', {
        timeOut: 1000,
      });
    });
  }

  decreaseQuantity(item: ICartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateItem(item).subscribe(() => {
        this.loadCart();
        this.toastr.success('Quantity updated successfully', '', {
          timeOut: 1000,
        });
      });
    } else {
      this.deleteItem(item);
    }
  }

  deleteItem(item: ICartItem) {
    this.cartService.deleteCartItem(item).subscribe(() => {
      this.loadCart();
      this.toastr.success('Product removed successfully', '', {
        timeOut: 1000,
      });
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.loadCart();
      this.toastr.success('Cart cleared successfully', '', {
        timeOut: 1000,
      });
    });
  }
}
