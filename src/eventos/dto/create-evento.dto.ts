import { IsString, IsNumber, IsOptional, IsDateString, IsMongoId, Min } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  readonly titulo: string;

  @IsString()
  readonly artista: string;

  @IsDateString()
  readonly fecha_evento: Date;

  @IsString()
  readonly lugar: string;

  @IsOptional()
  @IsString()
  readonly descripcion?: string;

  @IsString()
  readonly categoria: string;

  @IsString()
  readonly image_url: string;

  @IsNumber()
  @Min(0)
  readonly precio: number;

  @IsNumber()
  @Min(1)
  readonly entradas_disponibles: number;

  @IsMongoId()
  readonly creador_id: string;
}
