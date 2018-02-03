import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatSidenavModule,
  MatSnackBarModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatSnackBarModule,
  ]
})
export class AppMaterialModule {}