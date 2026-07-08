import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento, EventoDocument } from './schemas/evento.schema';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<EventoDocument>,
  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const createdEvento = new this.eventoModel(createEventoDto);
    return createdEvento.save();
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoModel.find().populate('creador_id', 'nombre email').exec();
  }

  async findOne(id: string): Promise<Evento> {
    const evento = await this.eventoModel.findById(id).populate('creador_id', 'nombre email').exec();
    if (!evento) {
      throw new NotFoundException(`Evento con ID #${id} no encontrado`);
    }
    return evento;
  }

  async update(id: string, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    const existingEvento = await this.eventoModel.findByIdAndUpdate(
      id,
      updateEventoDto,
      { new: true },
    ).exec();
    
    if (!existingEvento) {
      throw new NotFoundException(`Evento con ID #${id} no encontrado`);
    }
    return existingEvento;
  }

  async remove(id: string): Promise<Evento> {
    const deletedEvento = await this.eventoModel.findByIdAndDelete(id).exec();
    if (!deletedEvento) {
      throw new NotFoundException(`Evento con ID #${id} no encontrado`);
    }
    return deletedEvento;
  }
}
