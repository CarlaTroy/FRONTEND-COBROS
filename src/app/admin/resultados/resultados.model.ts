  export interface CrearResultadoDTO{
    year: number,
    costo_total_produccion: number,
    rentabilidad: number
}

export interface LitarResultadosDTO{
  id: number ;
  year: number,
  costo_total_produccion: number,
  rentabilidad: number
}
export interface ResultadoDTO{
  id: number ;
  year: number,
  costo_total_produccion: number,
  rentabilidad: number
}

export interface obtenerResultadoDTO{
  id: number;
  year: number,
  costo_total_produccion: number,
  rentabilidad: number
}


export interface estructuraFormularioResultadoDTO{
  year: number,
  costo_total_produccion: number,
  rentabilidad: number
  numeroHectarias: number;
  costoTotalProduccionPorHectaria: number;
  precioVentaAlMercado: number;
  rendimientoCultivo: number;
}



export interface ObtenerResultadoCompletoDTO{
  year: number;
}
