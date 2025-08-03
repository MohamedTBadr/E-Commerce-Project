import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../../interfaces/iproduct';
import { ProductsService } from '../../../services/products/products.service';
@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  ProductId: any;
  ProductDetails: Iproduct = {} as Iproduct;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.ProductId = res.get('id');
        console.log(this.ProductId);
        this.productsService.getSpecificProduct(this.ProductId).subscribe({
          next: (res) => {
            this.ProductDetails = res;
            console.log(this.ProductDetails);

          }
        })
      },
    })
  }

}
