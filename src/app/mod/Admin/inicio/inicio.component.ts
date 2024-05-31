import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
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
    RouterOutlet
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['inicio.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class InicioComponent {


}
