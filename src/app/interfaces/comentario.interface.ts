import { Usuario } from './usuario.interface';

export interface Comentario {
    _id?: string,
    texto?: string,
    usuario?: Usuario,
    usuarioId?: string,
    created?: Date,
    estaActivo?: boolean,
    sitioId?: string 
}