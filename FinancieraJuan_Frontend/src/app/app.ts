import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalisisComponent } from './pages/analisis/analisisComponent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AnalisisComponent],
  template: `<app-analisis></app-analisis>`,
})
export class App {
  protected readonly title = signal('FinancieraJuan_Frontend');
}
