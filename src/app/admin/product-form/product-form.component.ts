import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id;
  product = {};
  categories$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  save(product){
    if (this.id) this.productService.update(this.id, this.product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete it?')) return;
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id ) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }
}

