import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',//se le indica que pagina es la principal al cargar
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'directorio',
    loadChildren: () => import('./pages/directorio/directorio.module').then( m => m.DirectorioPageModule)
  },
  {
    path: 'avisos',
    loadChildren: () => import('./pages/avisos/avisos.module').then( m => m.AvisosPageModule)
  },
  {
    path: 'anuncios',
    loadChildren: () => import('./pages/anuncios/anuncios.module').then( m => m.AnunciosPageModule)
  },
  {
    path: 'pagos-comprobantes',
    loadChildren: () => import('./pages/pagos-comprobantes/pagos-comprobantes.module').then( m => m.PagosComprobantesPageModule)
  },
  {
    path: 'estados-cuenta',
    loadChildren: () => import('./pages/estados-cuenta/estados-cuenta.module').then( m => m.EstadosCuentaPageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./pages/gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'votaciones',
    loadChildren: () => import('./pages/votaciones/votaciones.module').then( m => m.VotacionesPageModule)
  },
  {
    path: 'contactos-emergencia',
    loadChildren: () => import('./pages/contactos-emergencia/contactos-emergencia.module').then( m => m.ContactosEmergenciaPageModule)
  },
  {
    path: 'visitas',
    loadChildren: () => import('./pages/visitas/visitas.module').then( m => m.VisitasPageModule)
  },
  {
    path: 'areas-comunes',
    loadChildren: () => import('./pages/areas-comunes/areas-comunes.module').then( m => m.AreasComunesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'pagos',//No se utilizo
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'adeudos',
    loadChildren: () => import('./pages/adeudos/adeudos.module').then( m => m.AdeudosPageModule)
  },
  {
    path: 'validar-comprobantes',
    loadChildren: () => import('./pages/validar-comprobantes/validar-comprobantes.module').then( m => m.ValidarComprobantesPageModule)
  },






 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
