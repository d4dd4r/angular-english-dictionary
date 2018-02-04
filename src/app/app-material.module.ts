import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatRadioModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
  ]
})
export class AppMaterialModule {}