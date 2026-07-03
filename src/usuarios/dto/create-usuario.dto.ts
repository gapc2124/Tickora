export class CreateUsuarioDto {
  readonly nombre: string;
  readonly email: string;
  readonly avatar_url?: string;
  readonly biografia?: string;
  readonly rol?: string;
}
