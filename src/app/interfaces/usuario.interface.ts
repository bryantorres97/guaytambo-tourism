import { Sitio } from './sitio.interface';

export interface Usuario {
    nickname?: string,
    email?: string,
    avatar?: string,
    tipo: string,
    favoritos?: Sitio[],
    estaActivo?: boolean,
    password?: string,
    _id?: string
}