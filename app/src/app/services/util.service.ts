import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private _snackBar: MatSnackBar, private _router: Router) { }

  reloadComponent(urlToNavigate: string){
    this._router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this._router.navigate([`${urlToNavigate}`])
    });
  }

  openSnackBar(message: string, urlToNavigate ?:string) { 
    let sb = this._snackBar.open(message, 'Ok', {
      duration: 3000,
      verticalPosition: 'top',
    });
    sb.afterDismissed().subscribe(
      () =>{
        if(urlToNavigate != undefined){
          this.reloadComponent(urlToNavigate);
        }
      }
    )
  }

}
