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
    path: 'estados-cuenta',
    loadChildren: () => import('./pages/estados-cuenta/estados-cuenta.module').then( m => m.EstadosCuentaPageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./pages/gastos/gastos.module').then( m => m.GastosPageModule)
  },

  {
    path: 'contactos-emergencia',
    loadChildren: () => import('./pages/contactos-emergencia/contactos-emergencia.module').then( m => m.ContactosEmergenciaPageModule)
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
    path: 'pagos',
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'asambleas',
    loadChildren: () => import('./pages/asambleas/asambleas.module').then( m => m.AsambleasPageModule)
  },
  {
    path: 'boton-panico',
    loadChildren: () => import('./pages/boton-panico/boton-panico.module').then( m => m.BotonPanicoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'reglamento',
    loadChildren: () => import('./pages/reglamento/reglamento.module').then( m => m.ReglamentoPageModule)
  },
  {
    path: 'mis-visitas',
    loadChildren: () => import('./pages/mis-visitas/mis-visitas.module').then( m => m.MisVisitasPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
