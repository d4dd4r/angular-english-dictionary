import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { NavbarLinks } from '../../../models/navbar-links.class';
import { SelfService } from '../../../services/self.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar">
      <nav class="navbar-header">
        <button mat-button
            routerLinkActive="active"
            *ngFor="let link of links"
            routerLink="{{ link.link }}">{{ link.name }}</button>
        <div class="flex-spacer"></div>
        <button mat-button (click)="logout()">Logout</button>
      </nav>
    </div>
  `,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input('links') public links: NavbarLinks[];
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private selfS: SelfService,
  ) {}

  logout() {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '25vw',
      data: { question: 'Are you sure?' }
    });

    this.confirmDialogRef.afterClosed()
      .first()
      .subscribe((isConfirm: boolean) => {
        if (isConfirm) {
          this.selfS.reset();
          this.router.navigate(['..', 'login']);
        }
      })
    ;
  }
}
