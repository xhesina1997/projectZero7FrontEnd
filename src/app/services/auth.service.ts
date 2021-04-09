import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url = "http://localhost:8080/authenticate"
  constructor(private httpClient: HttpClient, private router: Router) { }

  public login(formData){
    let data = {
      username:formData.form.value.email,
      password:formData.form.value.password
    }
    this.httpClient.post(this.url,data).subscribe((data:any) => {
      console.log(data);
      localStorage.setItem('token',JSON.stringify(data.token));
      this.router.navigate(["home"]);
    });
  }

  // public isTokenExpired()
}
