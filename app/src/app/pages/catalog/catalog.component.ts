import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { Productmodel } from '../../models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CatalogListComponent,
    MatToolbarModule,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  prodList: Array<Productmodel>  | undefined;
  constructor(private _apiservice:ApiService){}

  ngOnInit(){

    this._apiservice.getCarros().subscribe(
      (res) => {
        this.prodList = res;
      }
    );
  }
}
