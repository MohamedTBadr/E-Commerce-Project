import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
   private  apiUrl='https://fakestoreapi.com/';
  constructor(private http:HttpClient) {
   }
  register(user:any):Observable<any>{
    return this.http.post(this.apiUrl+"users",user);
  }

  login(user:{username:string,password:string}):Observable<any>{
    return this.http.post(this.apiUrl+"auth/login",user);
  }


}