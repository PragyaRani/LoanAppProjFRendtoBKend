import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreLoginLayoutComponent } from './core/components/layout/pre-login/pre-login-layout.component';
import { PostLoginLayoutComponent } from './core/components/layout/post-login/post-login-layout.component';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthguardService } from './core/helpers/authguard.service';

const LazyAdminModule = () =>
  import('./admin/admin.module').then((response) => response.AdminModule);
const LazyUserModule = () =>
  import('./user/user.module').then((response) => response.UserModule);


const routes: Routes = [
  { path: 'login', component: PreLoginLayoutComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect if going to /
  {
    path: 'layout',
    component: PostLoginLayoutComponent,
    children: [
      // { path: '', redirectTo: '/user-dashboard', pathMatch: 'full' },
      {
        path: 'user',
        loadChildren: LazyUserModule,
        canActivate: [AuthguardService],
        // allow access to role matching USER only
        data: { allowedRoles: ['USER'] },
      },
      {
        path: 'admin',
        loadChildren: LazyAdminModule,
        canActivate: [AuthguardService],
        // allow access to role matching ADMIN only
        data: { allowedRoles: ['ADMIN']}, // data: { allowedRoles: 'ADMIN' }
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent }, // wildcard redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
   // imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
