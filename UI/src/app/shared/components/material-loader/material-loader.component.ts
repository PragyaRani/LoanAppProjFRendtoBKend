import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './material-loader.component.html',
  styleUrls: ['./material-loader.component.css'],
})
export class MaterialLoaderComponent {
  loading$ = this.loaderService.loading$;
  constructor(private loaderService: LoaderService) {}
}
