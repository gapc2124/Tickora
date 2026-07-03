import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entrada, EntradaDocument } from './schemas/entrada.schema';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';

@Injectable()
export class EntradasService {
  constructor(
    @InjectModel(Entrada.name) private entradaModel: Model<EntradaDocument>,
  ) {}

  async create(createEntradaDto: CreateEntradaDto): Promise<Entrada> {
    const createdEntrada = new this.entradaModel(createEntradaDto);
    return createdEntrada.save();
  }

  async findAll(): Promise<Entrada[]> {
    return this.entradaModel.find()
      .populate('comprador', 'nombre email')
      .populate('evento', 'nombre fecha')
      .exec();
  }

  async findOne(id: string): Promise<Entrada> {
    const entrada = await this.entradaModel.findById(id)
      .populate('comprador', 'nombre email')
      .populate('evento', 'nombre fecha')
      .exec();
    if (!entrada) {
      throw new NotFoundException(`Entrada con ID #${id} no encontrada`);
    }
    return entrada;
  }

  async update(id: string, updateEntradaDto: UpdateEntradaDto): Promise<Entrada> {
    const existingEntrada = await this.entradaModel.findByIdAndUpdate(
      id,
      updateEntradaDto,
      { new: true },
    ).exec();
    
    if (!existingEntrada) {
      throw new NotFoundException(`Entrada con ID #${id} no encontrada`);
    }
    return existingEntrada;
  }

  async remove(id: string): Promise<Entrada> {
    const deletedEntrada = await this.entradaModel.findByIdAndDelete(id).exec();
    if (!deletedEntrada) {
      throw new NotFoundException(`Entrada con ID #${id} no encontrada`);
    }
    return deletedEntrada;
  }
}
