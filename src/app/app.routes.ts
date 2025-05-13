import { Routes } from '@angular/router';
import { AuthSignInComponent } from './auth/auth-signin/auth-signin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: 'signin',
    component: AuthSignInComponent,
  },
];
