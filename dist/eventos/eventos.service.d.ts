import { Model } from 'mongoose';
import { Evento, EventoDocument } from './schemas/evento.schema';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
export declare class EventosService {
    private eventoModel;
    constructor(eventoModel: Model<EventoDocument>);
    create(createEventoDto: CreateEventoDto): Promise<Evento>;
    findAll(): Promise<Evento[]>;
    findOne(id: string): Promise<Evento>;
    update(id: string, updateEventoDto: UpdateEventoDto): Promise<Evento>;
    remove(id: string): Promise<Evento>;
}
