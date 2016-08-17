import { RouterConfig }          from '@angular/router';

import { PageListComponent } from './page-list.component';
import { PageEditComponent } from './page-edit.component';

export const PageRoutes: RouterConfig = [
    { path: 'pages', component: PageListComponent },
    { path: 'pages/:id/edit', component: PageEditComponent }
];