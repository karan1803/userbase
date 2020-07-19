import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule} from './login/login.module';
import { RegisterModule } from './register/register.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { AuthguardService } from './services/auth/authguard.service';
import { UserResolver } from './user/user.resolver';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () =>LoginModule,
    canActivate: [AuthguardService],
  },
  {
    path:'login',
    loadChildren: () =>LoginModule,
    canActivate: [AuthguardService],
  },
  {
    path:'register',
    loadChildren: () =>RegisterModule,
    canActivate: [AuthguardService],
  },
  {
    path:'dashboard',
    loadChildren: () =>DashboardModule,
    canActivate: [AuthguardService],
  },
  {
    path:'user',
    loadChildren: () =>UserModule,
    resolve: { data: UserResolver}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
