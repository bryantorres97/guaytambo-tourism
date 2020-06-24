import { Usuario } from './usuario.interface';

export interface Calificacion {
    _id?: string,
    valor?: boolean,
    usuario?: Usuario,
    usuarioId?: string,    
    estaActivo?: boolean,
    sitioId?: string 
}