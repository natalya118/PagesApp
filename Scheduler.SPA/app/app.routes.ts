import { provideRouter  } from '@angular/router';
 
import { HomeComponent } from './home/home.component';

import { PageRoutes } from './pages/page.routes';
 
export const routes = [
    ...PageRoutes,

    { path: '', component: HomeComponent }
];
 
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];