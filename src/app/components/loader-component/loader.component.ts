import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from 'src/app/service/LoaderService';

@Component({
    selector: 'app-loader',
    template: `
    <div class="container-loader" *ngIf="isLoading$ | async">
      <span class="loader"></span>
    </div>`,
    styleUrls: ['./loader.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class LoaderComponent {
    isLoading$ = this.loaderService.isLoading$;

  constructor(private loaderService: LoaderService) {}
}