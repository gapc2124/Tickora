import { EntradasService } from './entradas.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
export declare class EntradasController {
    private readonly entradasService;
    constructor(entradasService: EntradasService);
    create(createEntradaDto: CreateEntradaDto): Promise<import("./schemas/entrada.schema").Entrada>;
    findAll(): Promise<import("./schemas/entrada.schema").Entrada[]>;
    findOne(id: string): Promise<import("./schemas/entrada.schema").Entrada>;
    update(id: string, updateEntradaDto: UpdateEntradaDto): Promise<import("./schemas/entrada.schema").Entrada>;
    remove(id: string): Promise<import("./schemas/entrada.schema").Entrada>;
}
