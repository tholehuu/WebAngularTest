import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';

import { LoginComponent } from './login';
import { AuthGuard } from './guards';

const routes: Routes = [
  { path:'', redirectTo: '',
    pathMatch: 'full'
  },
  { path:'category', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path:'user', component: UserHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: '**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
