import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WHeaderComponent } from '../../../shared/ui/header/header.component';
import { WFooterComponent } from '../../../shared/ui/footer/footer.component';
import { SidebarComponent } from '../../../shared/boss/sidebar/sidebar.component';


@Component({
  selector: 'inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    WHeaderComponent,
    WFooterComponent,
    SidebarComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InicioComponent {}
