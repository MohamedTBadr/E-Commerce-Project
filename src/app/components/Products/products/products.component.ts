import { Component, inject, OnInit } from '@angular/core';
import { Iproduct } from '../../../interfaces/iproduct';
import { ProductsService } from '../../../services/products/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  ProductList: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  searchTerm: string = '';

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.ProductList = res;
        this.filteredProducts = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.ProductList.filter(product =>
      product.title.toLowerCase().includes(term)
    );
  }
}

