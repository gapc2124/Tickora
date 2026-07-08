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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const usuario_schema_1 = require("./schemas/usuario.schema");
let UsuariosService = class UsuariosService {
    constructor(usuarioModel) {
        this.usuarioModel = usuarioModel;
    }
    async create(createUsuarioDto) {
        const { email } = createUsuarioDto;
        const existingUser = await this.usuarioModel.findOne({ email }).exec();
        if (existingUser) {
            throw new common_1.ConflictException(`El usuario con el email ${email} ya existe`);
        }
        const newUser = new this.usuarioModel({
            ...createUsuarioDto,
            passwordHash: createUsuarioDto.password,
        });
        const savedUser = await newUser.save();
        const userObj = savedUser.toObject();
        delete userObj.passwordHash;
        return userObj;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.usuarioModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        if (user.passwordHash !== password) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const userObj = user.toObject();
        delete userObj.passwordHash;
        return userObj;
    }
    async findAll() {
        return this.usuarioModel.find().select('-passwordHash').exec();
    }
    async findOne(id) {
        const usuario = await this.usuarioModel.findById(id).select('-passwordHash').exec();
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }
    async update(id, updateUsuarioDto) {
        const usuarioActualizado = await this.usuarioModel
            .findByIdAndUpdate(id, updateUsuarioDto, { new: true })
            .select('-passwordHash')
            .exec();
        if (!usuarioActualizado) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuarioActualizado;
    }
    async remove(id) {
        const usuarioEliminado = await this.usuarioModel.findByIdAndDelete(id).exec();
        if (!usuarioEliminado) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuarioEliminado;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usuario_schema_1.Usuario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map