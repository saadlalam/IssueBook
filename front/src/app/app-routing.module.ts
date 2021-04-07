import { IssueComponent } from './issue/issue.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [];

const appRoutes: Routes = [
  //{ path: 'login', component: LoginComponent },
  { path: '', component: IssuesComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
  { path: 'issue', component: IssueComponent, canActivate: [AuthGuard]},
  { path: 'issue/:id', component: IssueComponent, runGuardsAndResolvers: 'always'},
  { path: 'issues', component: IssuesComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
