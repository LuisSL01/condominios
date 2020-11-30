// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //  url: 'http://192.168.73.100:3000',
  // Endpoints para Gestión de Credenciales
  authServiceBaseUrl: 'http://localhost:8080',
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
  coreServiceBaseUrl: 'http://localhost:8081',
  // -> Empresa
  coreApiBaseEmpresaOperation: '/empresa',
  coreApiFilterEmpresaOperation: '/filter',
  coreApiGetConfiguracionEmpresaOperation: '/configuracion',
  coreApiGetFormularioEmpresaOperation: '/formulario',
  // -> Agentes
  coreApiBaseAgenteOperation: '/agente',
  coreApiBaseEmpresaGerenteOperation: ':listEmpresaGerente',
  coreApiBaseAllGerenteOperation: ':listAllGerente',
  coreApiRegisterBaseAgenteOperation: '/register',
  coreApiSetEmpresaToAgenteOperation: '/setEmpresa',
  coreApiGetAgenteConfigOperation: '/_config',
  coreApiGetAgenteEmailConfigOperation: '/_emailConfig',
  coreApiGetAgenteConfigTables: '/preferenciaDeTabla/agentes',
  coreApiGetConfigTables: '/preferenciaDeTabla',
  coreApiUpdateConfigTables: '/updtPreferenciaDeTabla',
  coreApiGetConfigTableName: '/agentes',
  coreApiBaseAgenteOperationList: '/list/page',
  coreApiBatchDeleteAgenteOperation: ':batchDelete',
  coreApiBatchUpdateRolAgenteOperation: ':batchRoles/',
  coreApiBatchDeleteUserAgenteOperation: ':batchDisableGerente',
  //  -> Clientes
  coreApiBaseClienteOperation: '/cliente',
  coreApiGetClientesListOperation: ':listByEmpresa',
  coreApiRegisterEventoClienteOperation: '/evento',
  coreApiGetEventosClienteOperation: ':listEvents',
  coreApiBatchDeleteClienteOperation: ':batchDelete',
  // ->CheckIn
  coreApiBaseCheckInOperation: '/visita',
  //  -> Servicios Tecnico
  coreApiBaseServicioTecnicoOperation: '/servicioTecnico',
  coreApiBatchDeleteServicioTecnicoOperation: ':batchDelete',
  coreApiGetServiciosTecnicosListOperation: ':listByEmpresa',
  coreApiArchivosServicioTecnicoOperation: '/archivo',
  coreApiArchivosServicioTecnicoAgente: '/agenteServicioTecnico',
  // Endpoints para Catálogos
  coreApiBatchDeleteUsuariosOperation: ':batchDelete',
  //Endpoints para Catálogos
  coreApiGetActividadEconomicaCatalog: '/actividadEconomica/list',
  coreApiGetRegimenFiscalCatalog: '/regimenFiscal/list',
  coreApiGetCodigoPostalCatalog: '/codigoPostal/filter',
  coreApiBaseTipoDeServicioCatalog: '/tipoDeServicio',
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
  coreApiGetVigenciaCotizacionByEmpresaAndActivesCatalog: '/_list-by-empresa-actives',
  //  -> Productos
  coreApiBaseProductoOperation: '/producto',
  coreApiGetProductosListOperation: '/:list',
  coreApiBatchDeleteProductoOperation: ':batchDelete',
  coreApiGetCodigoProductoCatalog: '/filter',
  //  -> Cotizaciones
  coreApiBaseCotizacionOperation: '/cotizacion',
  coreApiGetCotizacionListOperation: '/:list',
  coreApiBatchDeleteCotizacionOperation: ':batchDelete',
  coreApiBatchDeleteLogicCotizacionOperation: ':batchDeleteLogic',
  coreApiGetCodigoCotizacionCatalog: '/filter',
  googleMapsKey: 'AIzaSyAYCA8FtUjOYaBcwY50oaNoZquwAGm97mo',

  formsServiceBaseUrl: 'http://localhost:8082',
 // formularios
  //  -> Productos
  formsApiBaseFormularioOperation: '/formulario',
  formsApiGetFormularioListOperation: '/:list',
  formsApiBatchDeleteFormularioOperation: ':batchDelete',
  formsApiGetCodigoFormularioCatalog: '/filter',
  coreApiBaseMarcaCatalog: '/marca',

  //app- avisos
  coreApiBaseAvisosAdministracionOperation: '/aviso',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
