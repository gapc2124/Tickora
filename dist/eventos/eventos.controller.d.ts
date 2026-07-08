import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
export declare class EventosController {
    private readonly eventosService;
    constructor(eventosService: EventosService);
    uploadImage(file: Express.Multer.File): Promise<{
        image_url: string;
    }>;
    create(createEventoDto: CreateEventoDto): Promise<import("./schemas/evento.schema").Evento>;
    findAll(): Promise<import("./schemas/evento.schema").Evento[]>;
    findOne(id: string): Promise<import("./schemas/evento.schema").Evento>;
    update(id: string, updateEventoDto: UpdateEventoDto): Promise<import("./schemas/evento.schema").Evento>;
    remove(id: string): Promise<import("./schemas/evento.schema").Evento>;
}
