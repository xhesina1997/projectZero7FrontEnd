import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "http://localhost:8080/product"

  constructor(private httpClient: HttpClient) { }

  getAllProducts(pageSize,pageNumber){
    return this.httpClient.get<Product[]>(this.url + "/pageNr/" + pageNumber + "/pageSize/"+pageSize);
  }
  getAllProductsNotPaged(){
    return this.httpClient.get<Product[]>(this.url);
  }

  createProduct(body){
    return this.httpClient.post(this.url,body.payload);
  }
}
