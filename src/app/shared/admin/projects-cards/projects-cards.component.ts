import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IProyecto } from '../../../core/domain/models/IProyecto';
import { ProjectsUseCases } from '../../../core/domain/usecases/projects.use-case';
import { HttpProjectsRepository } from '../../../core/domain/repositories/projects-repository';
import { ProjectUpdateService } from '../../../core/services/projects/project-update.service';

@Component({
  selector: 'w-projects-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectsUseCases, HttpProjectsRepository],

})
export class WProjectsCardsComponent implements OnInit{
  dataProyect$: IProyecto[] = [];

  constructor(
    private projectsUseCases: ProjectsUseCases,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private projectUpdateService: ProjectUpdateService
  ) {}

  ngOnInit(): void {
    this.obtenerProyectos();
    this.projectUpdateService.projectUpdated$.subscribe(() => {
      this.obtenerProyectos();
    });
  }

  obtenerProyectos() {
    this.projectsUseCases.getAllProjects().subscribe(
      (proyectos) => {
        this.dataProyect$ = proyectos;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener los proyectos:', error);
      }
    );
  }

  irAlProyecto(id: number) {
    this.router.navigate(['/details', id]);
  }
}
