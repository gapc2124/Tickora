import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { email } = createUsuarioDto;
    
    // Verificar si el usuario ya existe
    const existingUser = await this.usuarioModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException(`El usuario con el email ${email} ya existe`);
    }

    // Nota: Aquí en el futuro deberías usar bcrypt para hashear la contraseña
    const newUser = new this.usuarioModel({
      ...createUsuarioDto,
      passwordHash: createUsuarioDto.password, // Temporalmente guardamos el texto para simular
    });
    return newUser.save();
  }

  async findAll(): Promise<Usuario[]> {
    // Retornamos todos excepto el passwordHash
    return this.usuarioModel.find().select('-passwordHash').exec();
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id).select('-passwordHash').exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioActualizado = await this.usuarioModel
      .findByIdAndUpdate(id, updateUsuarioDto, { new: true })
      .select('-passwordHash')
      .exec();
    
    if (!usuarioActualizado) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuarioActualizado;
  }

  async remove(id: string): Promise<Usuario> {
    const usuarioEliminado = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!usuarioEliminado) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuarioEliminado;
  }
}
