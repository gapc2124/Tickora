"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const evento_schema_1 = require("./schemas/evento.schema");
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = require("crypto");
let EventosService = class EventosService {
    constructor(eventoModel) {
        this.eventoModel = eventoModel;
        this.s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
        });
    }
    async uploadImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        const bucketName = process.env.S3_BUCKET_NAME || 'tickora-imagenes-eventos-prod';
        const region = process.env.AWS_REGION || 'us-east-1';
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `eventos/${(0, crypto_1.randomUUID)()}.${fileExtension}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await this.s3Client.send(command);
        return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
    }
    async create(createEventoDto) {
        const createdEvento = new this.eventoModel(createEventoDto);
        return createdEvento.save();
    }
    async findAll() {
        return this.eventoModel.find().populate('creador_id', 'nombre email').exec();
    }
    async findOne(id) {
        const evento = await this.eventoModel.findById(id).populate('creador_id', 'nombre email').exec();
        if (!evento) {
            throw new common_1.NotFoundException(`Evento con ID #${id} no encontrado`);
        }
        return evento;
    }
    async update(id, updateEventoDto) {
        const existingEvento = await this.eventoModel.findByIdAndUpdate(id, updateEventoDto, { new: true }).exec();
        if (!existingEvento) {
            throw new common_1.NotFoundException(`Evento con ID #${id} no encontrado`);
        }
        return existingEvento;
    }
    async remove(id) {
        const deletedEvento = await this.eventoModel.findByIdAndDelete(id).exec();
        if (!deletedEvento) {
            throw new common_1.NotFoundException(`Evento con ID #${id} no encontrado`);
        }
        return deletedEvento;
    }
};
exports.EventosService = EventosService;
exports.EventosService = EventosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(evento_schema_1.Evento.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventosService);
//# sourceMappingURL=eventos.service.js.map