export declare class CreateEventoDto {
    readonly titulo: string;
    readonly artista: string;
    readonly fecha_evento: Date;
    readonly lugar: string;
    readonly descripcion?: string;
    readonly categoria: string;
    readonly image_url: string;
    readonly precio: number;
    readonly creador_id: string;
}
