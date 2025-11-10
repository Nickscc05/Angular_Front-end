import { Routes } from '@angular/router';
import { HomePageComponent } from './componente/homepage/homepage.component';
import { CategoriaComponent } from './componente/categoria/categoria.component';

export const routes: Routes = [
    // Rotas do aplicativo
    {
        path: 'homepage',
        component: HomePageComponent
    },
    {
        path: 'categoria',
        component: CategoriaComponent
    },


    // Rota de redirecionamento inicial (para a raiz do app)
    {
        path: '',
        redirectTo: 'homepage',
        pathMatch: 'full'
    },
    // Rota catch-all para redirecionar para 'homepage' se a rota não for encontrada
    {
        path: '**',
        redirectTo: 'homepage'
    }
];
