import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ITaskRes } from '../../../core/domain/models/ITask';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TasksUseCases } from '../../../core/domain/usecases/tasks.use-case';
import { ActivatedRoute } from '@angular/router';
import { HttpTasksRepository } from '../../../core/domain/repositories/tasks-repository';
import { MatButtonModule } from '@angular/material/button';
import { formatDateSpanish } from '../../../core/utils/format-date.util';

@Component({
  selector: 'app-tarea-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './tarea-details.component.html',
  styleUrl: './tarea-details.component.css',
  providers: [TasksUseCases, HttpTasksRepository, DatePipe],
})
export default class TareaDetailsComponent {
  $tarea!: Observable<ITaskRes>;
  idTarea: number = 0;
  formattedStartDate: string = '';
  formattedEndDate: string = '';

  constructor(
    private tasksUseCases: TasksUseCases,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.idTarea = Number(this.route.snapshot.paramMap.get('taskId')!);
    this.loadTarea();
  }

  loadTarea() {
    this.$tarea = this.tasksUseCases.getTaskById(this.idTarea);
    this.$tarea.subscribe((tarea) => {
      this.formattedStartDate = this.formatDate(tarea.startdate);
      this.formattedEndDate = this.formatDate(tarea.enddate);
      this.cdr.detectChanges();
    });
  }
  sendForRevision(taskId: number) {
    this.tasksUseCases.updateTaskForRevision(taskId).subscribe(() => {
      this.toastr.success('Tarea Actualizada Exitosamente.', 'Success');
      this.loadTarea();
    });
  }

  sendCompleted(taskId: number) {
    this.tasksUseCases.updateTaskCompleted(taskId).subscribe(() => {
      this.toastr.success('Tarea Completada Exitosamente.', 'Success');
      this.loadTarea();
    });
  }
  sendDeclined(taskId: number) {
    this.tasksUseCases.updateTaskDeclined(taskId).subscribe(() => {
      this.toastr.warning('Tarea marcada como observación.', 'Warn');
      this.loadTarea();
    });
  }
  formatDate(dateString: string): string {
    return formatDateSpanish(dateString);
  }
  formatPercentage(percentage: number): string {
    return percentage === 0 ? '-%' : `${percentage}%`;
  }
}
