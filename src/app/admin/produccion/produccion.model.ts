import { ProductorDTO } from "../productores/productor.model";
import { TipoProductorDTO } from "../productores/tipo.producto";

  export interface CrearProduccionDTO{
    year:string;
    hectareas: number;
    precio_venta: number;
    toneladas: number;
    quintales: number;
    activo: boolean;
    fk_tipo_productor_id: TipoProductorDTO;
    fk_productor_id: ProductorDTO;
}

export interface EditProduccionDTO{
  id: number ;
  year:string;
  hectareas: number;
  precio_venta: number;
  toneladas: number;
  quintales: number;
  activo: boolean;
  fk_tipo_productor_id: string;
  fk_productor_id: number;
}


export interface LitarProduccionesDTO{
  id: number ;
  year:string;
  hectareas: number;
  precio_venta: number;
  toneladas: number;
  quintales: number;
  activo: boolean;
  stock: number;
  fk_tipo_productor: TipoProductorDTO;
  fk_productor: ProductorDTO;
}




export interface ProduccionDTO{
  id: number ;
  year:string;
  hectareas: number;
    precio_venta: number;
    toneladas: number;
    quintales: number;
    activo: boolean;
    fk_tipo_productor: TipoProductorDTO;
    fk_productor: ProductorDTO;
}

