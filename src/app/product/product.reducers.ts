import { Product } from "../models/Product"
import { ProductAction, ProductActionType } from "./product.actions";


export interface ProductState {
  productList: [],
  loading:boolean,
  error: Error
}
const initialState: ProductState = {
 productList: [
 ],
 loading: false,
 error: undefined

}

export function ProductReducer(
  state: ProductState = initialState,
  action: ProductAction
){
  switch (action.type){
    case ProductActionType.GET_PRODUCT:
      return {...state,loading:true};
    case ProductActionType.GET_PRODUCT_SUCCESS:
      return {...state, productList:action.payload,loading:false};
      case ProductActionType.GET_PRODUCT_FAILURE:
      return {...state,error:action.payload,loading:false};
      case ProductActionType.ADD_PRODUCT:
        return  {...state,loading:true};
      case ProductActionType.ADD_PRODUCT_SUCCESS:
        return  {...state, productList:{...state.productList},loading:false};
        case ProductActionType.ADD_PRODUCT_FAILURE:
        return  {...state, error:action.payload,loading:false};
      default:
        return state;
  }
}

