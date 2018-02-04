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
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
  ]
})
export class AppMaterialModule {}