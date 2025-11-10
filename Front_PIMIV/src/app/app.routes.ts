import { Routes } from '@angular/router';
import { HomePageComponent } from './componente/homepage/homepage.component';
import { CategoriaComponent } from './componente/categoria/categoria.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'categoria',
        component: CategoriaComponent
    }
];
