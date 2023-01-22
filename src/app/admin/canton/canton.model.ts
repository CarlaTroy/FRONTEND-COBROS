  export interface CrearCantonDTO{
    nombre:string;
    latitud: number;
    longitud: number;
    activo: boolean;
}

export interface LitarCantonesDTO{
  id: number ;
  nombre:string ;
  latitud: number;
  longitud: number;
  activo: boolean;
}
export interface CantonDTO{
  id: number ;
  nombre:string ;
  latitud: number;
  longitud: number;
  activo: boolean;
}

export interface obtenerCantonDTO{
  id: number;
  name:string;
}

