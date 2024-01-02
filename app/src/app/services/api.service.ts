import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Productmodel} from '../models';
import { UserModel, UserSignUp, UserChangeRole} from '../models';


const httpOptions1 = {
  headers: new HttpHeaders({ 
    'undefined': 'multipart/form-data', 
    'Access-Control-Allow-Origin': 'http://localhost:4200' }),
};


const httpOptions2 = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Credentials': 'true'}),
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http:HttpClient) { }

  readonly baseUrlAPI = 'http://localhost:8080/v1';

  logIn(username: string, password: string): Observable<any> {
    const form = new FormData;

    form.append('username', username);
    form.append('password', password);

    return this._http.post(
      `${this.baseUrlAPI}/auth/login`, 
      form,
      httpOptions1
    );
  }

  logOut(){
    const form = new FormData;

    return this._http.post(
      `${this.baseUrlAPI}/auth/logout`, 
      form,
      httpOptions2
    ) 
  }

  signup(username: string, email: string, password: string){

    const body: UserSignUp = {
      username: username,
      email: email,
      password: password
    }

    return this._http.post(
      `${this.baseUrlAPI}/auth/signup`, 
      body,
      httpOptions1
    );
  }

  getLogedUser(): any{
    return this._http.get(
      `${this.baseUrlAPI}/user/get-user-loged`, 
      httpOptions2
    )
  }

  getAdminUser(): any{
    return this._http.get(
      `${this.baseUrlAPI}/user/get-user-admin`, 
      httpOptions2
    )
  }

  getUsersList(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(`${this.baseUrlAPI}/user/get-users`) 
  }

  change_role(user_change_role: UserChangeRole){
    return this._http.post(
      `${this.baseUrlAPI}/user/change-role`, 
      user_change_role,
      httpOptions2
    ) 
  }

  getCarros(): Observable<Productmodel[]> {
    return this._http.get<Productmodel[]>(`${this.baseUrlAPI}/products/cars`) 
  }

}
