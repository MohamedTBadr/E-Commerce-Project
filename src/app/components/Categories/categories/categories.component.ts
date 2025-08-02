import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [CommonModule , FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  filteredCategories: string[] = [];
  categoryProducts: { [key: string]: any[] } = {};
  expandedCategories: Set<string> = new Set();
  searchTerm: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.http.get<string[]>('https://fakestoreapi.com/products/categories')
      .subscribe((cats) => {
        this.categories = cats;
        this.filteredCategories = cats;
        cats.forEach((cat) => this.fetchProductsByCategory(cat));
      });
  }

  fetchProductsByCategory(category: string): void {
    this.http.get<any[]>(`https://fakestoreapi.com/products/category/${category}`)
      .subscribe((products) => {
        this.categoryProducts[category] = products;
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
