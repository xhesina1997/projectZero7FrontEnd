import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate,OnInit{

  constructor(private router: Router) { }

  ngOnInit() {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    let authInfo = {
      authenticated: false
    };
    authInfo.authenticated = this.isLoggedIn();
    if (!authInfo.authenticated) {
      this.router.navigate(["login"]);
      return false;
    }

    return true;
  }

  isLoggedIn() :boolean{
    if(localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }
}
