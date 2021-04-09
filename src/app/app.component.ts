import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router,private CategoryService:CategoryService) {}
  categories:any = [];
  lclStorage = localStorage;

  ngOnInit(){
    this.getAllCategories();
  }

  goToHome(){
    this.router.navigate(["home"]);
  }
  getAllCategories(){
    this.CategoryService.getAllCategories().subscribe((data:any) => {
      console.log(data);
      this.categories = data;
    })


  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(["login"]);
  }
  login(){this.router.navigate(["login"]);}
}
