import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = "http://localhost:8080/category"
  constructor(private httpClient: HttpClient) { }

  getAllCategories(){
    return this.httpClient.get(this.url);
  }
}
