import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { Dashboard2Component } from './components/pages/dashboard2/dashboard2.component';
import { Dashboard3Component } from './components/pages/dashboard3/dashboard3.component';
import { PageEditorComponent } from './components/pages/page-editor/page-editor.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'dashboard2',
        component: Dashboard2Component,
        title: 'Dashboard2',
      },
      {
        path: 'dashboard3',
        component: Dashboard3Component,
        title: 'Dashboard3',
      },
      {
        path: 'pageEditor',
        component: PageEditorComponent,
        title: 'Page Editor',
      },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
