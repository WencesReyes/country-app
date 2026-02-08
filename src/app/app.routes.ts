import { Routes } from '@angular/router';
import { Home } from '../shared/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'country',
    loadChildren: () => import('../country/country.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
