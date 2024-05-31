import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WHeaderComponent } from '../../../shared/ui/header/header.component';
import { WFooterComponent } from '../../../shared/ui/footer/footer.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    WHeaderComponent,
    WFooterComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['inicio.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class InicioComponent {
  projectId: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
    });
  }


}
