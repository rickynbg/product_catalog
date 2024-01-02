import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { CatalogComponent } from './pages/catalog/catalog.component';
import { LoginComponent } from './pages/login/login.component'

import { ApiService } from './services/api.service';
import { SharedService } from './services/shared.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CatalogComponent,
    LoginComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'show-catalog';
  public isAuthenticated = false;
  public isAdmin = false;
  
  constructor(private _apiservice:ApiService, private _sharedservice: SharedService, private _router: Router){
    _sharedservice.isLoged.subscribe(
      (isLoged) => {
        this.isAuthenticated = isLoged;
      }
    );
    _sharedservice.isAdmin.subscribe(
      (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    );
  }

  http = inject(HttpClient);

  ngOnInit(){
    this._apiservice.getLogedUser().subscribe(
      (res: any) => {
        this.isAuthenticated = res.is_authenticated;
      },
      () => {
        this.isAuthenticated = false;
      },
      () => {
        if (this.isAuthenticated){
          this._apiservice.getAdminUser().subscribe(
            (res: any) => {
              this.isAdmin = res.is_admin;
            },
            () => {
              this.isAdmin = false;
            },
          );
        }
      }
    );
    
  }

  public logOut(){
    this._apiservice.logOut().subscribe(
      (res: any) => {
        this._router.navigateByUrl('/');
        this._sharedservice.isLoged.emit(false);
        this._sharedservice.isAdmin.emit(false);
      } 
    )
  }
}
