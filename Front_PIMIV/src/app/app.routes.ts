import { Routes } from '@angular/router';
import { HomePageComponent } from './componente/homepage/homepage.component';
import { CategoriaComponent } from './componente/categoria/categoria.component';
import { FuncionarioComponent } from './componente/funcionario/funcionario.component';
import { ProdutoComponent } from './componente/produto/produto.component';
import { UnidadeMedidaComponent } from './componente/unidade-medida/unidade-medida.component';
import { FornecedorComponent } from './componente/fornecedor/fornecedor.component';

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
    {
        path: 'unid-medida',
        component: UnidadeMedidaComponent
    },
    {
        path: 'produto',
        component: ProdutoComponent
    },
    {
        path: 'funcionario',
        component: FuncionarioComponent
    },
    {
        path: 'fornecedor',
        component: FornecedorComponent
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
