import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../product.service';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any; // Product[]
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) { }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnInit(): void {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
