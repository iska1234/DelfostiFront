import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ITaskRes } from '../../../core/domain/models/ITask';
import { calcularRangoDeDias, obtenerFechaAvance } from '../../../core/utils/format-date.util';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksUpdateService } from '../../../core/services/tasks/tasks-update.service';

@Component({
  selector: 'w-taks-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './taks-cards.component.html',
  styleUrl: './taks-cards.component.css'
})
export class WTaksCardsComponent {
  @Input() task!: ITaskRes;

  obtenerFechaAvance = obtenerFechaAvance;
  calcularRangoDeDias = calcularRangoDeDias;
  private taskUpdateSubscription: Subscription | undefined;

  constructor(private taskUpdateService: TasksUpdateService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.taskUpdateSubscription = this.taskUpdateService.taskUpdated$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }


}
