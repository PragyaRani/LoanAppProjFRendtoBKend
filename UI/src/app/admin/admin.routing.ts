import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './components/layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditLoanComponent } from './edit-loan/edit-loan.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: AdminDashboardComponent },
      // { path: 'dashboard/:tab', component: AdminDashboardComponent },
      {
        path: 'loan/:loanId',
        component: EditLoanComponent,
      },
      {
        path: 'loan',
        component: EditLoanComponent,
      }
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
export class AdminRoutingModule {}