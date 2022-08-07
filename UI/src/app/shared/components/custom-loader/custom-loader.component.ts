import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrls: ['./custom-loader.component.css'],
})
export class CustomLoaderComponent {
  loading$ = this.loaderService.loading$;
  constructor(private loaderService: LoaderService) {}
}
