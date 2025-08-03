import { Iproduct } from './../../../interfaces/iproduct';

import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { CartService } from '../../../services/cart/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  ProductList: Iproduct[] = [];
  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.ProductList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.getProducts();
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
