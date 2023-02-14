export interface LoginUserDTO{
    id: number,
    username: string,
    email: string,
    is_staff: boolean,
    token:string[],
    grupos: GrupoDTO[]
}

export interface GrupoDTO{
    id:number,
    name:string,
    permissions:number[],
}
