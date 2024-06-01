import { ChangeDetectorRef, Component, Inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WInput } from '../../ui/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUsersRes } from '../../../core/domain/models/IUsersRes';
import { Observable } from 'rxjs';
import { HttpAdminRepository } from '../../../core/domain/repositories/admin-repository';
import { AdminUseCases } from '../../../core/domain/usecases/admin.use-case';
import { formatDate } from '../../../core/utils/format-date.util';
import { ToastrService } from 'ngx-toastr';
import { TasksUseCases } from '../../../core/domain/usecases/tasks.use-case';
import { HttpTasksRepository } from '../../../core/domain/repositories/tasks-repository';
import { TasksUpdateService } from '../../../core/services/tasks/tasks-update.service';

@Component({
  selector: 'w-modal',
  templateUrl: 'modal-newtask.component.html',
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
  providers: [
    AdminUseCases,
    HttpAdminRepository,
    TasksUseCases,
    HttpTasksRepository,
  ],
})
export class ModalNewTask {
  addNewProjectForm!: FormGroup;
  users$!: Observable<IUsersRes[]>;
  projectId!: number;


  constructor(
    public dialogRef: MatDialogRef<ModalNewTask>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private adminUseCases: AdminUseCases,
    private tasksUseCases: TasksUseCases,
    private taskUpdateService: TasksUpdateService,
  ) {
    this.projectId = data.projectId;
  }

  ngOnInit(): void {
    this.addNewProjectForm = this.formBuilder.group({
      taskName: [''],
      taskDescription: [''],
      startDate: [''],
      endDate: [''],
      responsible: [''],
    });
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.adminUseCases.execute();
  }

  onSubmit(): void {
    if (this.addNewProjectForm.invalid) {
      return;
    }

    const taskData = {
      projectid: this.projectId,
      taskname: this.addNewProjectForm.get('taskname')?.value,
      taskdescription: this.addNewProjectForm.get('taskdescription')?.value,
      startdate: formatDate(this.addNewProjectForm.get('startdate')?.value),
      enddate:formatDate(this.addNewProjectForm.get('enddate')?.value),
      responsible: this.addNewProjectForm.get('responsible')?.value,
    };
    console.log('Task Data:', taskData);
    this.tasksUseCases.addNewTask(taskData).subscribe(
      (response) => {
        this.toastr.success('Proyecto registrado exitosamente.', 'Success');
        this.taskUpdateService.notifyTaskUpdated();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Error al registrar el proyecto', 'Error');
      }
    );
  }
}
