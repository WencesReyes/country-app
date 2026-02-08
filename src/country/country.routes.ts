import { Routes } from '@angular/router';
import { ByCapital } from './pages/by-capital/by-capital';
import { CountryLayout } from './layouts/country-layout/country-layout';

const routes: Routes = [
  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapital,
      },
      {
        path: 'by-country',
        loadComponent: () => import('./pages/by-country/by-country'),
      },
      {
        path: 'by-region',
        loadComponent: () => import('./pages/by-region/by-region'),
      },
      {
        path: 'by/:code',
        loadComponent: () => import('./pages/country/country'),
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];

export default routes;
