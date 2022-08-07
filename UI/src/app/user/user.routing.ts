import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLayoutComponent } from './components/layout/user-layout.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: UserDashboardComponent },
    //   {
    //     path: 'loan/:loanId',
    //     component: loanDetailsComponent,
    //   },
    //   {
    //     path: 'user/:userId',
    //     component: userDetailsComponent,
    //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [FormGuard],
})
export class UserRoutingModule {}