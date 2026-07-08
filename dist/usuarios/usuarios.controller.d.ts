import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<import("./schemas/usuario.schema").Usuario>;
    findAll(): Promise<import("./schemas/usuario.schema").Usuario[]>;
    findOne(id: string): Promise<import("./schemas/usuario.schema").Usuario>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<import("./schemas/usuario.schema").Usuario>;
    remove(id: string): Promise<import("./schemas/usuario.schema").Usuario>;
}
