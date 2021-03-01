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
    path: 'area-comun-reserva',
    loadChildren: () => import('./pages/area-comun-reserva/area-comun-reserva.module').then( m => m.AreaComunReservaPageModule)
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
  {
    path: 'empresa',
    loadChildren: () => import('./pages/empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'sincronizar',
    loadChildren: () => import('./pages/sincronizar/sincronizar.module').then( m => m.SincronizarPageModule)
  },
  {
    path: 'agente',
    loadChildren: () => import('./pages/agente/agente.module').then( m => m.AgentePageModule)
  },
  {
    path: 'mis-areas-comunes',
    loadChildren: () => import('./pages/mis-areas-comunes/mis-areas-comunes.module').then( m => m.MisAreasComunesPageModule)
  },
  {
    path: 'menu-areas-comunes',
    loadChildren: () => import('./pages/menu-areas-comunes/menu-areas-comunes.module').then( m => m.MenuAreasComunesPageModule)
  },
  {
    path: 'resoluciones',
    loadChildren: () => import('./pages/resoluciones/resoluciones.module').then( m => m.ResolucionesPageModule)
  },
  {
    path: 'convocatorias',
    loadChildren: () => import('./pages/convocatorias/convocatorias.module').then( m => m.ConvocatoriasPageModule)
  },
  {
    path: 'votaciones',
    loadChildren: () => import('./pages/votaciones/votaciones.module').then( m => m.VotacionesPageModule)
  },
  {
    path: 'visitas',
    loadChildren: () => import('./pages/visitas/visitas.module').then( m => m.VisitasPageModule)
  },
  {
    path: 'bitacora-visitas',
    loadChildren: () => import('./pages/bitacora-visitas/bitacora-visitas.module').then( m => m.BitacoraVisitasPageModule)
  },

  {
    path: 'pagos-comprobantes',
    loadChildren: () => import('./pages/pagos-comprobantes/pagos-comprobantes.module').then( m => m.PagosComprobantesPageModule)
  },
  {
    path: 'validar-comprobantes',
    loadChildren: () => import('./pages/validar-comprobantes/validar-comprobantes.module').then( m => m.ValidarComprobantesPageModule)
  },
  
  {
    path: 'adeudos',
    loadChildren: () => import('./pages/adeudos/adeudos.module').then( m => m.AdeudosPageModule)
  },
  {
    path: 'cfdi',
    loadChildren: () => import('./pages/cfdi/cfdi.module').then( m => m.CfdiPageModule)
  },
  {
    path: 'constancia-no-adeudo',
    loadChildren: () => import('./pages/constancia-no-adeudo/constancia-no-adeudo.module').then( m => m.ConstanciaNoAdeudoPageModule)
  },
  {
    path: 'recibos',
    loadChildren: () => import('./pages/recibos/recibos.module').then( m => m.RecibosPageModule)
  },  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'datos-interes',
    loadChildren: () => import('./pages/datos-interes/datos-interes.module').then( m => m.DatosInteresPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
