import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpTasksRepository } from '../../../core/domain/repositories/tasks-repository';
import { TasksUseCases } from '../../../core/domain/usecases/tasks.use-case';
import { ITaskRes } from '../../../core/domain/models/ITask';
import { map, Observable } from 'rxjs';
import { UserDataService } from '../../../core/services/user-data.service';
import { AdminUseCases } from '../../../core/domain/usecases/admin.use-case';
import { HttpAdminRepository } from '../../../core/domain/repositories/admin-repository';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, RouterLink,],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css',
  providers: [TasksUseCases, HttpTasksRepository, AdminUseCases, HttpAdminRepository],
})
export default class TareasComponent {
  tableThead = ['Nombre de Tarea', 'Fecha Fin', 'Estado', 'Acciones'];
  data$!: Observable<ITaskRes[]>;
  userId: number = 0;

  constructor(
    private tasksUseCases: TasksUseCases,
    private adminUseCases: AdminUseCases,
    private userDataService: UserDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.userDataService.getUserId());
    this.loadUserProjectId();
    this.cdr.detectChanges();
  }

  loadUserProjectId(): void {
    this.adminUseCases.getUserProjectId(this.userId).subscribe(projectId => {
      this.loadTasks(projectId);
      this.cdr.detectChanges();
    });
  }

  loadTasks(projectId: number): void {
    this.data$ = this.tasksUseCases.getTasksForProject(projectId)
      .pipe(
        map(tasks => {
          console.log('Tareas recibidas:', tasks);
          return tasks.sort((a, b) => this.compareStates(a.state || '', b.state || ''));
        })
      );
    this.cdr.detectChanges();
  }


  compareStates(stateA: string, stateB: string): number {
    const stateOrder: { [key: string]: number } = {
      'Observación': 1,
      'Revisión': 2,
      'Elaboración': 3,
      'Completada': 4
    };

    const orderA = stateOrder[stateA] || Number.MAX_SAFE_INTEGER;
    const orderB = stateOrder[stateB] || Number.MAX_SAFE_INTEGER;

    return orderA - orderB;
  }
}
