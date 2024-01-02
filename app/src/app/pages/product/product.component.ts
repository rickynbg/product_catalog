import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';
import { Productmodel } from '../../models';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  prodList = new MatTableDataSource<Productmodel>();
  displayedColumns: string[] = ['name', 'mark', 'model', 'year', 'info', 'plate', 'value', 'actions'];
  
  constructor(private _apiservice:ApiService, public dialog: MatDialog){}

  ngOnInit(){

    this._apiservice.getCarros().subscribe(
      (res) => {
        this.prodList.data = res;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNewProduct);
  }
}

@Component({
  selector: 'product-new-dialog',
  templateUrl: 'product-new-dialog.html',
  styleUrl: './product.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
})
export class DialogNewProduct{

  name = new FormControl('', [Validators.required]);
  mark = new FormControl('', [Validators.required]);
  model = new FormControl('', [Validators.required]);
  year = new FormControl('', [Validators.required]);
  plate = new FormControl('', [Validators.required]);
  value = new FormControl('', [Validators.required]);
  info = new FormControl('');
  color = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<DialogNewProduct>,
    @Inject(MAT_DIALOG_DATA) public data: Productmodel,
  ) {}
  
  getError() {
    if (this.name.hasError('required')) {
      return 'Required';
    }
    return
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
