import { IntermediarioDTO } from "../intermediario/intermediario.model";
import { ProduccionDTO } from "../produccion/produccion.model";
import { ProductorDTO } from "../productores/productor.model";

export interface CrearIntermediarioProduccionDTO{
    year_compra:number;
    cantidad_comprada: number;
    activo: boolean;
    fk_intermediario_id: number;
    fk_produccion_id: number;
}

export interface EditarIntermediarioProduccionDTO{
  id: number ;
  year_compra:number;
  cantidad_comprada: number;
  activo: boolean;
  fk_intermediario_id: number;
  fk_produccion_id: number;
}


export interface LitarIntermediariosProduccionDTO{
  id: number ;
  year_compra:number;
  cantidad_comprada: number;
  activo: boolean;
  fk_intermediario: IntermediarioDTO;
  fk_produccion: ProduccionDTO;

}
export interface IntermediarioProduccionDTO{
  id: number ;
  year_compra:number;
  cantidad_comprada: number;
  activo: boolean;
  fk_intermediario: IntermediarioDTO;
  fk_produccion: ProduccionDTO;
}


export interface obtenerIntermediarioProduccionDTO{
  id: number;
  name:string;
}

