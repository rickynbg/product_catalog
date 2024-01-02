import { Component } from '@angular/core';

import { FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';

import { ApiService } from '../../services/api.service'
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // Minimum four characters, at least one uppercase letter, 
  // one lowercase letter, one number and one special character
  readonly patternValPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{4,}$/

  hide = true;
  user = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required, Validators.pattern(this.patternValPass)]);

  constructor(
    private _apiservice:ApiService,
    private _util: UtilService
    ){}

  getErrorUser() {
    if (this.user.hasError('required')) {
      return 'You must enter username';
    }
    return
  }

  getErrorEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter email';
    }
    if (this.email.hasError('email')) {
      return 'You must enter valid email';
    }
    return
  }

  getErrorpass() {
    if (this.pass.hasError('required')) {
      return 'You must enter password';
    }
    if (this.pass.hasError('pattern')) {
      return 'Password with at least one uppercase, lowercase,  number and special character';
    }
    return
  }

  public onSubmit(){
    if (!this.getErrorUser() && !this.getErrorEmail() && !this.getErrorpass()){
      this._apiservice.signup(this.user.value || '', this.email.value || '', this.pass.value || '').subscribe({
      next: (res: any) =>{
        this._util.openSnackBar(res.message, '/');
      },
      error: (err) =>{
        this._util.openSnackBar(err.error.detail);
      },
    });
    }
  }
}
