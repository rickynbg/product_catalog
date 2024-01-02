import { Component } from '@angular/core';

import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import { ApiService } from '../../services/api.service'
import { SharedService } from '../../services/shared.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  useremail = new FormControl('', [Validators.required]);
  pass = new FormControl('', [Validators.required]);

  constructor(
    private _apiservice:ApiService, 
    private _sharedservice: SharedService,
    private _util: UtilService
  ){}

  getErrorUserEmailMessage() {
    if (this.useremail.hasError('required')) {
      return 'You must enter username/email';
    }
    return
  }

  getErrorUserPasswordMessage() {
    if (this.pass.hasError('required')) {
      return 'You must enter password';
    }
    return
  }

  public onSubmit(){
    if (!this.getErrorUserEmailMessage() && !this.getErrorUserPasswordMessage()){
      this._apiservice.logIn(this.useremail.value || '', this.pass.value || '').subscribe({
      next: (res: any) =>{
        this._sharedservice.isLoged.emit(true);
        this._sharedservice.isAdmin.emit(res.is_admin)
        this._util.reloadComponent('/');
      },
      error: (err) =>{
        this._sharedservice.isLoged.emit(false);
        this._sharedservice.isAdmin.emit(false);
        this._util.openSnackBar(err.error.detail);
      },
    });
    }
  }
}
