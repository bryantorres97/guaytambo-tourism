export interface Usuario {
    nickname?: string,
    email?: string,
    avatar?: string,
    tipo: string,
    favoritos?: string[],
    estaActivo?: boolean,
    password?: string
}