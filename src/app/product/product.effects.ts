import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { ProductService } from "../services/product.service";
import { AddProductAction, AddProductFailureAction, AddProductSuccessAction, GetProductAction, GetProductFailureAction, GetProductSuccessAction, ProductAction, ProductActionType } from "./product.actions";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from "rxjs";
import { Product } from "../models/Product";

@Injectable()
export class ProductEffects {

loadingProducts$ = createEffect(() => this.actions$.pipe(
  ofType<ProductAction>(ProductActionType.GET_PRODUCT),
    mergeMap(() => this.productService.getAllProducts(10,1)
      .pipe(
        map(data => {return new GetProductSuccessAction(data)}),
        catchError(error => of(new GetProductFailureAction(error))))
      ))
  );

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType<AddProductAction>(ProductActionType.ADD_PRODUCT),
      mergeMap((data) => this.productService.createProduct(data)
        .pipe(
          map((data :Product) =>  new AddProductSuccessAction(data)),
          catchError(error => of(new AddProductFailureAction(error))))
        ))
    );
  constructor(private actions$: Actions,private productService: ProductService){}

}
