// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //  url: 'http://192.168.73.100:3000',
  // Endpoints para Gestión de Credenciales

/*   
  authServiceBaseUrl: 'http://54.177.89.203:8080',
  coreServiceBaseUrl: 'http://54.177.89.203:8081',
  formsServiceBaseUrl: 'http://54.177.89.203:8082',  */
 
  
  

  authServiceBaseUrl: 'http://192.168.80.107:8080',
  coreServiceBaseUrl: 'http://192.168.80.107:8081',
  formsServiceBaseUrl: 'http://192.168.80.107:8082',



  /* authServiceBaseUrl: 'http://54.177.89.203:8080',
  coreServiceBaseUrl: 'http://54.177.89.203:8081',
  formsServiceBaseUrl: 'http://54.177.89.203:8082', */

  
  authApiGetUsersOperation: '/users/',
  authApiBaseUserOperation: '/user/',
  authApiUpdatePasswordOperation: '/user/updatePassword/',
  authApiRegisterUserOperation: '/register/',
  authApiRegisterAgenteOperation: '/registerAgente/',
  authApiGetRolesOperation: '/roles/',
  authApiGetPerfilesOperation: '/profiles',
  authApiGetPerfilOperation: '/profile/',
  authApiGetTokenOperation: '/token/generate-token',
  authApiGetUsersByRoleOperation: '/users:listByRole',
  // Endpoints para Gestión de Operaciones de Negocio
  
  // -> Empresa
  coreApiBaseEmpresaOperation: '/empresa',
   coreApiFilterEmpresaOperation: '/filter',
  coreApiActividadEconomicaEmpresaOperation: '/actividadEconomica',
  coreApiGetConfiguracionEmpresaOperation: '/configuracion',
  coreApiGetFormularioEmpresaOperation: '/formulario',
  coreApiGetEmpresasAgente: '/listEmpresas', 

  // -> Agentes
  coreApiBaseAgenteOperation: '/agente',
  coreApiBaseAddEmpresaOperation: '/addEmpresa',
  /* coreApiBaseEmpresaGerenteOperation: ':listEmpresaGerente',
  coreApiBaseAllGerenteOperation: ':listAllGerente', */
  coreApiRegisterBaseAgenteOperation: '/register',
  coreApiUpdateStatusAgenteOperation: 'updateStatus',

  /* coreApiSetEmpresaToAgenteOperation: '/setEmpresa',
  coreApiGetAgenteConfigOperation: '/_config',
  coreApiGetAgenteEmailConfigOperation: '/_emailConfig',
  coreApiGetAgenteConfigTables: '/preferenciaDeTabla/agentes',
  coreApiGetConfigTables: '/preferenciaDeTabla',
  coreApiUpdateConfigTables: '/updtPreferenciaDeTabla', */
  coreApiGetConfigTableName: '/agentes',
  coreApiBaseAgenteOperationList: '/list/page',
  /* coreApiBatchDeleteAgenteOperation: ':batchDelete',
  coreApiBatchUpdateRolAgenteOperation: ':batchRoles/',
  coreApiBatchDeleteUserAgenteOperation: ':batchDisableGerente', */
  //  -> Clientes
  /* coreApiBaseClienteOperation: '/cliente',
  coreApiGetClientesListOperation: ':listByEmpresa',
  coreApiRegisterEventoClienteOperation: '/evento',
  coreApiGetEventosClienteOperation: ':listEvents',
  coreApiBatchDeleteClienteOperation: ':batchDelete', */
  // ->CheckIn
  /* coreApiBaseCheckInOperation: '/visita', */
  //  -> Servicios Tecnico
  /* coreApiBaseServicioTecnicoOperation: '/servicioTecnico',
  coreApiBatchDeleteServicioTecnicoOperation: ':batchDelete',
  coreApiGetServiciosTecnicosListOperation: ':listByEmpresa',
  coreApiArchivosServicioTecnicoOperation: '/archivo',
  coreApiArchivosServicioTecnicoAgente: '/agenteServicioTecnico', */
  // Endpoints para Catálogos
  /* coreApiBatchDeleteUsuariosOperation: ':batchDelete', */
  //Endpoints para Catálogos
   /* coreApiGetActividadEconomicaCatalog: '/actividadEconomica/list',
  coreApiGetRegimenFiscalCatalog: '/regimenFiscal/list', */
  coreApiGetCodigoPostalCatalog: '/codigoPostal/filter',
/*  coreApiBaseTipoDeServicioCatalog: '/tipoDeServicio',
  coreApiGetTipoDeServicioCatalog: ':listByEmpresa',
  coreApiBaseSerieCotizacionCatalog: '/serie-cotizacion',
  coreApiDisableSerieCotizacionByEmpresaCatalog: '/_disable',
  coreApiGetSerieCotizacionByEmpresaCatalog: '/_list-by-empresa',
  coreApiGetSerieCotizacionByEmpresaAndActivesCatalog: '/_list-by-empresa-actives',
  coreApiBaseTipoCotizacionCatalog: '/tipo-cotizacion',
  coreApiDisableTipoCotizacionByEmpresaCatalog: '/_disable',
  coreApiGetTipoCotizacionByEmpresaCatalog: '/_list-by-empresa',
  coreApiGetTipoCotizacionByEmpresaAndActivesCatalog: '/_list-by-empresa-actives',
  coreApiBaseVigenciaCotizacionCatalog: '/vigencia-cotizacion',
  coreApiDisableVigenciaCotizacionByEmpresaCatalog: '/_disable',
  coreApiGetVigenciaCotizacionByEmpresaCatalog: '/_list-by-empresa',
  coreApiGetVigenciaCotizacionByEmpresaAndActivesCatalog: '/_list-by-empresa-actives', */
  //  -> Productos
  /* coreApiBaseProductoOperation: '/producto',
  coreApiGetProductosListOperation: '/:list',
  coreApiBatchDeleteProductoOperation: ':batchDelete',
  coreApiGetCodigoProductoCatalog: '/filter', */
  //  -> Cotizaciones
  /* coreApiBaseCotizacionOperation: '/cotizacion',
  coreApiGetCotizacionListOperation: '/:list',
  coreApiBatchDeleteCotizacionOperation: ':batchDelete',
  coreApiBatchDeleteLogicCotizacionOperation: ':batchDeleteLogic',
  coreApiGetCodigoCotizacionCatalog: '/filter',
  googleMapsKey: 'AIzaSyAYCA8FtUjOYaBcwY50oaNoZquwAGm97mo', */

  
 // formularios
  //  -> Productos
  /* formsApiBaseFormularioOperation: '/formulario',
  formsApiGetFormularioListOperation: '/:list',
  formsApiBatchDeleteFormularioOperation: ':batchDelete',
  formsApiGetCodigoFormularioCatalog: '/filter',*/
  coreApiBaseMarcaCatalog: '/marca', 

  coreApiBaseDeleteOperation: '/delete',
  coreApiBaseEditOperation: '/edit',
  //app- avisos
  coreApiBaseAvisosAdministracionOperation: '/aviso',
  coreApiBasePublicacionOperation: '/publicacion',
  coreApiBasePublicacionRespuestaOperation: '/respuesta',  
  coreApiBasePublicacionReporteOperation: '/reporte',  
  coreApiBasePublicacionesOperation: '/publicaciones',
  coreApiUpdateStatusPublicacionOperation: 'updateStatus',
  coreApiBaseAnuncioOperation: '/anuncio',
  coreApiGetAnunciosListOperation: ':listByEmpresa',

  //Areas-Comunes
  coreApiBaseAreaComunOperation: '/area-comun',  
  coreApiBaseAreasComunesOperation: '/areas-comunes',
  coreApiGetAreaComunListOperation: ':listByEmpresa',
  coreApiBaseAreaComunReservaOperation:'/area-comun-reserva',

  //Votaciones

  coreApiBaseVotacionOperation: '/votacion',  
  coreApiBaseVotacionRespuestaOperation: '/respuesta',  
  coreApiBaseVotacionesOperation: '/votaciones',
  coreApiGetVotacionListOperation: ':listByEmpresa',
  
  //visitas
  coreApiBaseVisitaOperation: '/visit',    
  coreApiBaseVisitasOperation: '/visitas',
  coreApiGetVisitaListOperation: ':listByEmpresa',
  coreApiGetVisitaByIdAndUUIDOperation: ':findByUuid',

  //bitacora-visita
  coreApiBaseBitacoraVisitaOperation: '/bitacora-visit',      
  coreApiGetBitacoraVisitaListOperation: ':listByEmpresa',

  //Adeudo
  coreApiBaseAdeudoOperation: '/adeudo',    
  coreApiBaseAdeudoByEmpresaOperation: '/adeudoByEmpresa',
  coreApiBaseAdeudosOperation: '/adeudos',
  coreApiGetAdeudoListOperation: ':listByEmpresa',
  coreApiGetAdeudoAgenteListOperation: ':listByEmpresaAndAgente',

  //Pagos-comprobantes
  coreApiBasePagoComprobanteOperation: '/pago-comprobante',  
  coreApiGetPagoComprobanteListOperation: ':listByEmpresa',
  coreApiGetPagoComprobanteAgenteListOperation: ':listByEmpresaAndAgente',

   //Gasto
   coreApiBaseGastoOperation: '/gasto',    
   coreApiBaseGastoByEmpresaOperation: '/gastoByEmpresa',
   coreApiBaseGastosOperation: '/gastos',
   coreApiGetGastoListOperation: ':listByEmpresa',
   coreApiGetGastoAgenteListOperation: ':listByEmpresaAndAgente',
 
  //Contactos
  coreApiBaseContactoOperation: '/contacto',  
  coreApiGetContactoListOperation: ':listByEmpresa',
  
  //Directorios
  coreApiBaseDirectorioOperation: '/directorio',  
  coreApiGetDirectorioListOperation: ':listByEmpresa',

  //Notificaciones
  coreApiBaseNotificacionOperation: '/notificacion',  
  coreApiGetNotificacionListOperation: ':listByEmpresa',
  coreApiGetNotificacionListAgenteOperation: ':listByAgente',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


