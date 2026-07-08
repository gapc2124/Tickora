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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntradaSchema = exports.Entrada = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Entrada = class Entrada {
};
exports.Entrada = Entrada;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Usuario', required: true }),
    __metadata("design:type", Object)
], Entrada.prototype, "comprador", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Evento', required: true }),
    __metadata("design:type", Object)
], Entrada.prototype, "evento", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Entrada.prototype, "zona", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Entrada.prototype, "precio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['valida', 'usada'], default: 'valida' }),
    __metadata("design:type", String)
], Entrada.prototype, "estado", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Entrada.prototype, "codigo_qr", void 0);
exports.Entrada = Entrada = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Entrada);
exports.EntradaSchema = mongoose_1.SchemaFactory.createForClass(Entrada);
//# sourceMappingURL=entrada.schema.js.map