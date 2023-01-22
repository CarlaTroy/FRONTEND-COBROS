import { CantonDTO } from "../canton/canton.model";
import { ParroquiaDTO } from "../parroquia/parroquia.model";

export interface CrearProductorDTO{
    nombre:string;
    apellido:string;
    cedula:string;
    celular:string;
    activo:string;
    fk_canton_id:number;
    fk_parroquia_id:number;
}

export interface LitarProductoresDTO{
  id: number ;
  nombre:string;
  apellido:string;
  cedula:string;
  celular:string;
  activo:string;
  fk_canton:CantonDTO;
  fk_parroquia:ParroquiaDTO;
}
export interface ProductorDTO{
  id: number ;
  nombre:string;
  apellido:string;
  cedula:string;
  celular:string;
  activo:string;
  fk_canton:CantonDTO;
  fk_parroquia:ParroquiaDTO;
}

export interface EditProductorDTO{
  id: number ;
  nombre:string;
  apellido:string;
  cedula:string;
  celular:string;
  activo:string;
  fk_canton_id:number;
  fk_parroquia_id:number;
}
export interface obtenerProductorDTO{
  name:string;
}

export interface ObtenerUnProductorDTO{
  id: number ;
  nombre:string;
  apellido:string;
  cedula:string;
  celular:string;
  activo:string;
  fk_canton:CantonDTO;
  fk_parroquia:ParroquiaDTO;
}


export interface combiarCantonParroquiaProductorDTO{
  id: number ;
  nombre:string;
  apellido:string;
  cedula:string;
  celular:string;
  activo:string;
  canton:string;
  parroquia:string;
}