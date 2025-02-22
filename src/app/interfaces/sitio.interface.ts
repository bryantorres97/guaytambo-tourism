// Generated by https://quicktype.io

import { Categoria } from './categoria.interface';
import { Foto } from './foto.interface';
import { Comentario } from './comentario.interface';

export interface Sitio {
    telefonos?:      string[];
    calificaciones?: any[];
    comentarios?:    Comentario[];
    fotos?:          Foto[];
    estaActivo?:     boolean;
    _id?:            string;
    nombreEs?:       string;
    nombreEn?:       string;
    descripcionEs?:  string;
    descripcionEn?:  string;
    latitud?:        number;
    longitud?:       number;
    imagenPortada?:  string;
    imagenPerfil?:   string;
    direccion?:      string;
    whatsapp?:      string,
    website?:        string;
    categoria?:      Categoria;
    categoriaId?:    string;
    __v?:            number;
}


