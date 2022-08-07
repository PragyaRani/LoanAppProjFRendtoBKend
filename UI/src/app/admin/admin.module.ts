import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin.routing';

import { AdminLayoutComponent } from './components/layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { EditLoanComponent } from './edit-loan/edit-loan.component';


const materialComponentModules = [MatTabsModule];

@NgModule({
  declarations: [AdminLayoutComponent, AdminDashboardComponent, EditLoanComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ...materialComponentModules,
  ],
  // exports: [...materialComponentModules]
})
export class AdminModule {}
