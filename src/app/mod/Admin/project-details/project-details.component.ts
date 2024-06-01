import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ITaskRes } from '../../../core/domain/models/ITask';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IMes } from '../../../core/domain/models/IMes';
import { ProjectsUseCases } from '../../../core/domain/usecases/projects.use-case';
import { HttpProjectsRepository } from '../../../core/domain/repositories/projects-repository';
import { TasksUseCases } from '../../../core/domain/usecases/tasks.use-case';
import { HttpTasksRepository } from '../../../core/domain/repositories/tasks-repository';
import { ModalNewTask } from '../../../shared/admin/modal-newtask/modal-newtask.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TasksUpdateService } from '../../../core/services/tasks/tasks-update.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
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

  id: number = 0;
  mesI = 0;
  mesF = 0;
  año = 0;
  public meses: IMes[] = [];
  public showGantt: boolean = false;

  constructor(
    private tasksUseCases: TasksUseCases,
    private projectsUseCases: ProjectsUseCases,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private tasksUpdateService: TasksUpdateService,
    private cdr: ChangeDetectorRef
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
    this.tasksUpdateService.taskUpdated$.subscribe(() => {
      this.dataTasks$ = this.tasksUseCases.getTasksForProject(this.id);
      this.cdr.detectChanges();
    });
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

  changeGantt() {
    this.showGantt = !this.showGantt;
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

  obtenerFechaAvance(fechaFin: string): number {
    let band = 0;
    const fFin = new Date(fechaFin);
    const fActual = new Date();
    const diasDiferencia = this.calcularRangoDeDias(fFin);

    if (fActual > fFin) {
      band = 1;
    } else {
      if (diasDiferencia <= 3) {
        band = 3;
      } else {
        band = 2;
      }
    }
    return band;
  }

  calcularRangoDeDias(fechaTermino: Date) {
    var fechaActual = new Date();
    var tiempoTermino = fechaTermino.getTime();
    var tiempoActual = fechaActual.getTime();
    var diferenciaEnMilisegundos = tiempoTermino - tiempoActual;
    var diferenciaEnDias = Math.ceil(
      diferenciaEnMilisegundos / (1000 * 3600 * 24)
    );

    return diferenciaEnDias;
  }

  goBack(): void {
    window.history.back();
  }
}
