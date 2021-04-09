import { ProductState } from "../product/product.reducers";
import { Product } from "./Product";

export interface AppState {
  readonly products : ProductState
}
