import { CantonDTO } from "../canton/canton.model";

export interface CrearParroquiaDTO{
    nombre:string;
    fk_canton_id: number;
    activo: boolean;
}

export interface LitarParroquiasDTO{
  id: number ;
  nombre:string ;
  fk_canton: CantonDTO;
  activo: boolean;
}
export interface ParroquiaDTO{
  id: number ;
  nombre:string ;
  fk_canton_id: CantonDTO;
  activo: boolean;
}

export interface EditParroquiaDTO{
  id: number ;
  nombre:string ;
  fk_canton_id: number;
  activo: boolean;
}

export interface ObtenerUnaParroquiaDTO{
  id: number ;
  nombre:string ;
  fk_canton: CantonDTO;
  activo: boolean;
}

export interface obtenerParroquiaDTO{
  id: number;
  name:string;
}
