import { Component, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WInput } from '../input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUsersRes } from '../../../core/domain/models/IUsersRes';
import { Observable } from 'rxjs';
import { HttpAdminRepository } from '../../../core/domain/repositories/admin-repository';
import { AdminUseCases } from '../../../core/domain/usecases/admin.use-case';


@Component({
  selector: 'w-modal',
  templateUrl: 'modal-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    WInput,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [AdminUseCases, HttpAdminRepository],

})
export class ModalDialog {
  addNewProjectForm!: FormGroup;
  users$!: Observable<IUsersRes[]>;

  constructor(
    public dialogRef: MatDialogRef<ModalDialog>,
    private formBuilder: FormBuilder,
    private adminUseCases: AdminUseCases
  ) {}

  ngOnInit(): void {
    this.addNewProjectForm = this.formBuilder.group({});
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.adminUseCases.execute();
  }
}
