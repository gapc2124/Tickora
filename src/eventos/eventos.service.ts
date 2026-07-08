import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento, EventoDocument } from './schemas/evento.schema';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class EventosService {
  private s3Client: S3Client;

  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<EventoDocument>,
  ) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const bucketName = process.env.S3_BUCKET_NAME || 'tickora-imagenes-eventos-prod';
    const region = process.env.AWS_REGION || 'us-east-1';
    
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `eventos/${randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
  }

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
