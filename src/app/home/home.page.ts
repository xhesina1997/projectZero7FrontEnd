import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../models/app.state';
import { Product } from '../models/Product';
import { GetProductAction } from '../product/product.actions';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public pageNumber = 1;
  public pageSize = 5;
  message: string;
  bgClass: string;
  p = 1;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  products: Observable<Product[]>;


  constructor(private productService:ProductService,private menu: MenuController,private router: Router,private store: Store<AppState>) {
    // this.store.dispatch(new GetProducts());
    // this.store.select('products').subscribe(response => {

    //   this.products = response.todoProducts;
    //   this.message = response.message;
    //   this.bgClass = response.infoClass;

    //   setTimeout(() => {
    //     this.message = '';
    //   }, 2000);

    // }, error => {
    //   console.log(error);
    // });

  }



  ngOnInit() {
  }

  ionViewWillEnter(){
    this.store.dispatch(new GetProductAction());
    this.products = this.store.select((store:any) => store.products.productList.content);
    this.loading$ = this.store.select(store => store.products.loading);
    this.error$ =  this.store.select(store => store.products.error);

  }

  getProductsPaginated(){
    this.productService.getAllProducts(this.pageSize,this.pageNumber).subscribe((data:any) => {
      this.products = data.content;
    })

  }
  openMenu() {
    this.menu.open();
  }
  goToProductCreation(){
    this.router.navigate(["product-creation"]);
  }
}
