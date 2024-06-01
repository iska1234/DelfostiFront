import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WInput } from '../../ui/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUsersRes } from '../../../core/domain/models/IUsersRes';
import { Observable } from 'rxjs';
import { HttpAdminRepository } from '../../../core/domain/repositories/admin-repository';
import { AdminUseCases } from '../../../core/domain/usecases/admin.use-case';
import { ProjectsUseCases } from '../../../core/domain/usecases/projects.use-case';
import { HttpProjectsRepository } from '../../../core/domain/repositories/projects-repository';
import { formatDate } from '../../../core/utils/format-date.util';
import { ToastrService } from 'ngx-toastr';
import { ProjectUpdateService } from '../../../core/services/projects/project-update.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'w-modal',
  templateUrl: 'modal-newproject.component.html',
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
    MatProgressBarModule
  ],
  providers: [
    AdminUseCases,
    HttpAdminRepository,
    ProjectsUseCases,
    HttpProjectsRepository,
  ],
})
export class ModalNewProject {
  addNewProjectForm!: FormGroup;
  users$!: Observable<IUsersRes[]>;
  isSubmitting = false;
  constructor(
    public dialogRef: MatDialogRef<ModalNewProject>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private adminUseCases: AdminUseCases,
    private projectsUseCases: ProjectsUseCases,
    private projectUpdateService: ProjectUpdateService
  ) {}

  ngOnInit(): void {
    this.addNewProjectForm = this.formBuilder.group({
      name: [''],
      description: [''],
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
    this.isSubmitting = true;
    const projectData = {
      name: this.addNewProjectForm.get('name')?.value,
      description: this.addNewProjectForm.get('description')?.value,
      startDate: formatDate(this.addNewProjectForm.get('startDate')?.value),
      endDate:formatDate(this.addNewProjectForm.get('endDate')?.value),
      responsible: this.addNewProjectForm.get('responsible')?.value,
    };

    this.projectsUseCases.saveNewProject(projectData).subscribe(
      (response) => {
        this.toastr.success('Proyecto registrado exitosamente.', 'Success');
        this.projectUpdateService.notifyProjectUpdated();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Error al registrar el proyecto', 'Error');
      }
    ).add(() => {
      this.isSubmitting = false;
    });
  }
}
