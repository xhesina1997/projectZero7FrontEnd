import { Action } from '@ngrx/store';
import {Product } from '../models/Product';

export enum ProductActionType {
  GET_PRODUCT = '[PRODUCT] Get products',
  GET_PRODUCT_SUCCESS = '[PRODUCT] Get products successfully!',
  GET_PRODUCT_FAILURE = '[PRODUCT] Get products failed!',
  ADD_PRODUCT = '[PRODUCT] Add product ',
  ADD_PRODUCT_SUCCESS = '[PRODUCT] Add product successfully!',
  ADD_PRODUCT_FAILURE = '[PRODUCT] Add product failed!'
}

export class GetProductAction implements Action {
  readonly type = ProductActionType.GET_PRODUCT;
}
export class GetProductSuccessAction implements Action {
  readonly type = ProductActionType.GET_PRODUCT_SUCCESS;

  constructor(public payload: Array<Product>){}
}
export class GetProductFailureAction implements Action {
  readonly type = ProductActionType.GET_PRODUCT_FAILURE;

  constructor(public payload: Error){}
}
export class AddProductAction implements Action {
  readonly type = ProductActionType.ADD_PRODUCT;

  constructor(public payload: Product){console.log(payload)}
}
export class AddProductSuccessAction implements Action {
  readonly type = ProductActionType.ADD_PRODUCT_SUCCESS;

  constructor(public payload: Product){}
}
export class AddProductFailureAction implements Action {
  readonly type = ProductActionType.ADD_PRODUCT_FAILURE;

  constructor(public payload: Error){}
}

export type ProductAction = GetProductAction | GetProductSuccessAction | GetProductFailureAction| AddProductAction | AddProductSuccessAction | AddProductFailureAction;
