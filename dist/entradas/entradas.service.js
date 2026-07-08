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
exports.EntradasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const entrada_schema_1 = require("./schemas/entrada.schema");
let EntradasService = class EntradasService {
    constructor(entradaModel) {
        this.entradaModel = entradaModel;
    }
    async create(createEntradaDto) {
        const createdEntrada = new this.entradaModel(createEntradaDto);
        return createdEntrada.save();
    }
    async findAll() {
        return this.entradaModel.find()
            .populate('comprador', 'nombre email')
            .populate('evento', 'nombre fecha')
            .exec();
    }
    async findOne(id) {
        const entrada = await this.entradaModel.findById(id)
            .populate('comprador', 'nombre email')
            .populate('evento', 'nombre fecha')
            .exec();
        if (!entrada) {
            throw new common_1.NotFoundException(`Entrada con ID #${id} no encontrada`);
        }
        return entrada;
    }
    async update(id, updateEntradaDto) {
        const existingEntrada = await this.entradaModel.findByIdAndUpdate(id, updateEntradaDto, { new: true }).exec();
        if (!existingEntrada) {
            throw new common_1.NotFoundException(`Entrada con ID #${id} no encontrada`);
        }
        return existingEntrada;
    }
    async remove(id) {
        const deletedEntrada = await this.entradaModel.findByIdAndDelete(id).exec();
        if (!deletedEntrada) {
            throw new common_1.NotFoundException(`Entrada con ID #${id} no encontrada`);
        }
        return deletedEntrada;
    }
};
exports.EntradasService = EntradasService;
exports.EntradasService = EntradasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(entrada_schema_1.Entrada.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EntradasService);
//# sourceMappingURL=entradas.service.js.map