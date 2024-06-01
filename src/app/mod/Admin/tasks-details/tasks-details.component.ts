import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ITaskRes } from '../../../core/domain/models/ITask';
import { TasksUseCases } from '../../../core/domain/usecases/tasks.use-case';
import { HttpTasksRepository } from '../../../core/domain/repositories/tasks-repository';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tasks-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './tasks-details.component.html',
  styleUrl: './tasks-details.component.css',
  providers: [TasksUseCases, HttpTasksRepository],
})
export default class TasksDetailsComponent {
  dataTask$!: Observable<ITaskRes>;

  constructor(
    private toastr: ToastrService,
    private taskService: TasksUseCases,
    private rtActivate: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idTarea = Number(this.rtActivate.snapshot.paramMap.get('taskId'));
    this.dataTask$ = this.taskService.getTaskById(idTarea);
    this.dataTask$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  formatearAvance(avance: number): string {
    return avance === 0 ? '-' : `${avance}%`;
  }

  goBack(): void {
    window.history.back();
  }
}
