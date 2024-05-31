import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WProjectsCardsComponent } from '../../../shared/admin/projects-cards/projects-cards.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {  ModalDialog } from '../../../shared/ui/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, WProjectsCardsComponent, RouterLink, MatDialogModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
