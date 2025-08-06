import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  filteredCategories: string[] = [];
  categoryProducts: { [key: string]: any[] } = {};
  expandedCategories: Set<string> = new Set();
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
  this.http.get<{ products: Product[] }>('https://dummyjson.com/products?limit=100')
    .subscribe((res) => {
      const products = res.products;

      const categoriesSet = new Set<string>();

      products.forEach((product: Product) => {
        categoriesSet.add(product.category);
        // استخدم أول صورة فقط
        product.image = product.images[0];
      });

      this.categories = Array.from(categoriesSet);
      this.filteredCategories = [...this.categories];

      this.categories.forEach((category: string) => {
        this.categoryProducts[category] = products.filter((p: Product) => p.category === category);
      });
    });
}


  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCategories = this.categories.filter(cat =>
      cat.toLowerCase().includes(term)
    );
  }

  toggleCategoryExpansion(category: string): void {
    if (this.expandedCategories.has(category)) {
      this.expandedCategories.delete(category);
    } else {
      this.expandedCategories.add(category);
    }
  }
}
