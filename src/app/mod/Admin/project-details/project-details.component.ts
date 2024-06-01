import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ITaskRes } from '../../../core/domain/models/ITask';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { IMes } from '../../../core/domain/models/IMes';
import { ProjectsUseCases } from '../../../core/domain/usecases/projects.use-case';
import { HttpProjectsRepository } from '../../../core/domain/repositories/projects-repository';
import { TasksUseCases } from '../../../core/domain/usecases/tasks.use-case';
import { HttpTasksRepository } from '../../../core/domain/repositories/tasks-repository';
import { ModalNewTask } from '../../../shared/admin/modal-newtask/modal-newtask.component';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { TasksUpdateService } from '../../../core/services/tasks/tasks-update.service';
import { WTaksCardsComponent } from '../../../shared/admin/taks-cards/taks-cards.component';
import { calcularRangoDeDias, obtenerFechaAvance } from '../../../core/utils/format-date.util';
import { ViewModeService } from '../../../core/services/projects/view-mode.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatMenuModule, MatIconModule, WTaksCardsComponent, FormsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
  providers: [
    ProjectsUseCases,
    HttpProjectsRepository,
    TasksUseCases,
    HttpTasksRepository,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectDetailsComponent {
  dataTasks$: Observable<ITaskRes[]>;
  filteredTasks$!: Observable<ITaskRes[]>;
  stateFilter: string = 'all';
  id: number = 0;
  mesI = 0;
  mesF = 0;
  año = 0;
  public meses: IMes[] = [];
  viewMode:string = ''
  //funciones
  obtenerFechaAvance = obtenerFechaAvance;
  calcularRangoDeDias = calcularRangoDeDias;

  constructor(
    private tasksUseCases: TasksUseCases,
    private projectsUseCases: ProjectsUseCases,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private tasksUpdateService: TasksUpdateService,
    private cdr: ChangeDetectorRef,
    private viewModeService: ViewModeService
  ) {
    this.id = +this.route.snapshot.params['projectId'];
    this.projectsUseCases
      .getMonthsProjects(this.id.toString())
      .subscribe((data) => {
        this.año = data.año;
        this.mesI = data.mesInicio;
        this.mesF = data.mesFin;
        this.meses = this.obtenerDiasPorRangoDeMeses(
          this.año,
          this.mesI,
          this.mesF
        );
      });

    this.dataTasks$ = this.tasksUseCases.getTasksForProject(this.id);
  }

  ngOnInit(): void {
    this.viewMode = this.viewModeService.getViewMode() || '';
    this.updateViewMode();

    this.tasksUpdateService.taskUpdated$.subscribe(() => {
      this.fetchTasks();
    });

    this.fetchTasks();
    this.filterTasks(this.stateFilter);
  }

  private updateViewMode() {
    this.cdr.detectChanges();
  }
  private fetchTasks() {
    this.dataTasks$ = this.tasksUseCases.getTasksForProject(this.id);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ModalNewTask, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { projectId: this.id },
    });
  }

  changeCards() {
    this.viewMode = 'cards';
    this.viewModeService.setViewMode(this.viewMode);
    this.updateViewMode();
  }

  changeGantt() {
    this.viewMode = 'gantt';
    this.viewModeService.setViewMode(this.viewMode);
    this.updateViewMode();
  }

  changeTimeline() {
    this.viewMode = 'timeline';
    this.viewModeService.setViewMode(this.viewMode);
    this.updateViewMode();
  }


  obtenerDiasPorRangoDeMeses(
    anio: number,
    mesInicial: number,
    mesFinal: number
  ): IMes[] {
    const meses: IMes[] = [];
    for (let i = mesInicial; i <= mesFinal; i++) {
      const nombreMes = new Date(anio, i - 1).toLocaleString('es-ES', {
        month: 'long',
      });
      const cantidadDias = new Date(anio, i, 0).getDate();
      const diasDelMes = Array.from(
        { length: cantidadDias },
        (_, index) => index + 1
      );
      meses.push({
        nombre: nombreMes,
        numero: i,
        dias: diasDelMes,
      });
    }
    return meses;
  }

  getMonthFromDate(fecha: string): number {
    let fechaDate = new Date(fecha);
    return fechaDate.getMonth() + 1;
  }

  obtenerCantidadDias(fechaInicio: string, fechaFin: string): number {
    let fInit = new Date(fechaInicio);
    let fFin = new Date(fechaFin);
    const tiempoInicio = fInit.getTime();
    const tiempoFin = fFin.getTime();
    const diferenciaMilisegundos = tiempoFin - tiempoInicio;
    const milisegundosEnUnDia = 1000 * 60 * 60 * 24;
    const diferenciaDias = diferenciaMilisegundos / milisegundosEnUnDia + 1;

    return Math.round(diferenciaDias);
  }

  obtenerDia(fecha: string): number {
    let fechaI = new Date(fecha);
    const dia = fechaI.getDate();
    return dia;
  }

  filterTasks(state: string) {
    this.filteredTasks$ = this.dataTasks$.pipe(
      map(tasks => {
        if (state === 'all') {
          return tasks;
        }
        return tasks.filter(task => task.state === state);
      })
    );
    this.cdr.detectChanges();
  }
  goBack(): void {
    window.history.back();
  }
}
