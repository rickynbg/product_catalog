import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { UserModel, UserChangeRole, UserActionsColumns } from '../../models';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatSlideToggleModule, 
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  color: ThemePalette = 'accent';
  public columnsSchema: any[] = UserActionsColumns;
  
  public displayedColumns: string[] = UserActionsColumns.map((col) => col.key);
  public userList = new MatTableDataSource<UserModel>();
  
  constructor(private _apiservice:ApiService, private _util: UtilService){}
  
  ngOnInit(){
    this._apiservice.getUsersList().subscribe(
      (res) => {
        this.userList.data = res;
      }
    );
  }

  onToggle(event: any, username: string, email: string){
    const user: UserChangeRole = {
      username: username,
      email: email,
      is_admin: event.checked,
    }
    this._apiservice.change_role(user).subscribe({
      next: (res: any) =>{
        this._util.openSnackBar(res.message)
      },
      error: (err) =>{
        this._util.openSnackBar(err.error.detail, '/users')
      },
    });
  }
}
