import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Evento, EventoDocument } from './schemas/evento.schema';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class EventosService {
  private s3Client: S3Client;
  private readonly logger = new Logger(EventosService.name);

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
    try {
      // Validar y castear el creador_id a un ObjectId de Mongoose real
      if (!Types.ObjectId.isValid(createEventoDto.creador_id)) {
        throw new BadRequestException('El creador_id no es un ObjectId válido de MongoDB');
      }

      // Preparar el documento inyectando el ObjectId casteado y el estado requerido
      const documentToSave = {
        ...createEventoDto,
        creador_id: new Types.ObjectId(createEventoDto.creador_id),
        precio: Number(createEventoDto.precio),
        entradas_disponibles: Math.floor(Number(createEventoDto.entradas_disponibles)), // Asegurar que sea entero (int)
        fecha_evento: new Date(createEventoDto.fecha_evento),
        estado: 'publicado', // MongoDB requiere el campo 'estado' obligatoriamente en tu esquema nativo
      };

      const createdEvento = new this.eventoModel(documentToSave);
      return await createdEvento.save();
    } catch (error) {
      this.logger.error('Error fatal al intentar guardar el evento en MongoDB', error.stack, error.message);
      
      if (error.name === 'ValidationError' || error.name === 'MongoServerError') {
        throw new BadRequestException(`Fallo de validación en MongoDB: ${error.message}`);
      }
      
      throw new InternalServerErrorException('Error interno al crear el evento');
    }
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
