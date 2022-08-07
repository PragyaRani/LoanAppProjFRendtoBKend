import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user.routing';

import { UserLayoutComponent } from './components/layout/user-layout.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UserLayoutComponent,
    UserDashboardComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
