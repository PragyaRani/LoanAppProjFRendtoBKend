import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderService } from '../core/services/loader.service';

import { MaterialLoaderComponent } from './components/material-loader/material-loader.component';
import { CustomLoaderComponent } from './components/custom-loader/custom-loader.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { MatTooltipModule } from '@angular/material/tooltip';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { MessageAlertComponent } from './components/message-alert/message-alert.component';

const sharedComponents = [
  MaterialLoaderComponent,
  CustomLoaderComponent,
  MessageAlertComponent,
  PageNotFoundComponent,
  LoanListComponent,
];

// const sharedServices = [];

const materialComponentModules = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSelectModule,

  MatTooltipModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialComponentModules,
  ],
  exports: [
    ...sharedComponents,
    FormsModule,
    ReactiveFormsModule,
    ...materialComponentModules,
  ],
  // providers: [sharedServices],
  declarations: [
    ...sharedComponents,
    CustomLoaderComponent,
    MaterialLoaderComponent,
  ],
})
export class SharedModule {}
