export interface CrearCostoProduccionDTO{
  year:string ;
  
  desbroce_monte: number;
  quema_maleza: number;
  seleccion_semilla: number;
  aplicacion_hebricida: number;
  desinfeccion_semilla: number;
  siembra: number;
  siembra_total: number;

  primera_fertilizacion: number;
  primer_control_plagas: number;
  primer_control_enfermedades: number;
  aplicacion_herbicida: number;
  segunda_fertilizacion: number;
  segundo_control_plagas: number;
  segundo_control_enfermedades: number;
  tercera_fertilizacion: number;
  tiempo_espera: number;
  labores_culturales_total:number;

  recolectado: number;
  amontonado: number;
  desgranado: number;
  alquiler_desgranadora: number;
  ensacado_almacenamiento: number;
  control_tratamiento_maiz: number;
  venta: number;
  cosecha_total: number;

  costo_total: number;
  activo: boolean;
}

export interface LitarCostoProduccionesDTO{
  id: number ;
  year:string ;

  desbroce_monte: number;
  quema_maleza: number;
  seleccion_semilla: number;
  aplicacion_hebricida: number;
  desinfeccion_semilla: number;
  siembra: number;
  siembra_total: number;

  primera_fertilizacion: number;
  primer_control_plagas: number;
  primer_control_enfermedades: number;
  aplicacion_herbicida: number;
  segunda_fertilizacion: number;
  segundo_control_plagas: number;
  segundo_control_enfermedades: number;
  tercera_fertilizacion: number;
  tiempo_espera: number;
  labores_culturales_total:number;

  recolectado: number;
  amontonado: number;
  desgranado: number;
  alquiler_desgranadora: number;
  ensacado_almacenamiento: number;
  control_tratamiento_maiz: number;
  venta: number;
  cosecha_total: number;

  costo_total: number;
  activo: boolean;


}
export interface CostoProduccionDTO{
  id: number ;
  year:string ;

  desbroce_monte: number;
  quema_maleza: number;
  seleccion_semilla: number;
  aplicacion_hebricida: number;
  desinfeccion_semilla: number;
  siembra: number;
  siembra_total: number;

  primera_fertilizacion: number;
  primer_control_plagas: number;
  primer_control_enfermedades: number;
  aplicacion_herbicida: number;
  segunda_fertilizacion: number;
  segundo_control_plagas: number;
  segundo_control_enfermedades: number;
  tercera_fertilizacion: number;
  tiempo_espera: number;
  labores_culturales_total:number;

  recolectado: number;
  amontonado: number;
  desgranado: number;
  alquiler_desgranadora: number;
  ensacado_almacenamiento: number;
  control_tratamiento_maiz: number;
  venta: number;
  cosecha_total: number;

  costo_total: number;
  activo: boolean;

}

export interface obtenerCostoProduccionDTO{
  id: number;
  name:string;
}


