export class CreateEntradaDto {
  readonly comprador: string;
  readonly evento: string;
  readonly zona: string;
  readonly precio: number;
  readonly estado?: string;
  readonly codigo_qr: string;
}
