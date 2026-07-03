export class CreateEventoDto {
  readonly nombre: string;
  readonly artista: string;
  readonly fecha: Date;
  readonly lugar: string;
  readonly descripcion?: string;
  readonly organizador: string;
}
