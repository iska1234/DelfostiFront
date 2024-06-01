import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpTasksRepository } from '../../../core/domain/repositories/tasks-repository';
import { TasksUseCases } from '../../../core/domain/usecases/tasks.use-case';
import { ITaskRes } from '../../../core/domain/models/ITask';
import { map, Observable } from 'rxjs';
import { UserDataService } from '../../../core/services/user-data.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, RouterLink,],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css',
  providers: [TasksUseCases, HttpTasksRepository],
})
export default class TareasComponent {
  tableThead = ['Nombre de Tarea', 'Fecha Fin', 'Estado', 'Acciones'];
  data$!: Observable<ITaskRes[]>;
  userId: number = 0;

  constructor(
    private tasksUseCases: TasksUseCases,
    private cdr: ChangeDetectorRef,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.userDataService.getUserId());
    this.data$ = this.tasksUseCases.getTasksForUser(this.userId.toString())
      .pipe(
        map(tasks => tasks.sort((a, b) => this.compareStates(a.state || '', b.state || '')))
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
