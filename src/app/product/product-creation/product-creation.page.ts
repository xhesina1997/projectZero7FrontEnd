import { Component, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/models/app.state';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AddProductAction, GetProductAction } from '../product.actions';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.page.html',
  styleUrls: ['./product-creation.page.scss'],
})
export class ProductCreationPage implements OnInit {

  categories:any = [];
  private readonly subsc = new Subscription();
  itemToBeAdded:any = {};
  constructor(private productService:ProductService,private categoryService:CategoryService,private store: Store<AppState>,private actionsSubj: ActionsSubject) {
    this.subsc = this.actionsSubj.pipe(
      ofType('[PRODUCT] Add product successfully!')
   ).subscribe(data => {
      console.log("Added item!!");

   });

  }

  ngOnInit() {
    this.getAllCategories();
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
  createProduct(form){
    console.log(form)
    this.itemToBeAdded = form.form.value;
    this.store.dispatch(new AddProductAction({title:this.itemToBeAdded.title,
    categoryId:this.itemToBeAdded.categoryId,
    price: this.itemToBeAdded.price,
    brand: this.itemToBeAdded.brand,
    size: this.itemToBeAdded.size,
    productColor: this.itemToBeAdded.productColor,
    description: this.itemToBeAdded.description}));

  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((data:any) => {
      this.categories = data;
    })

  }
}
