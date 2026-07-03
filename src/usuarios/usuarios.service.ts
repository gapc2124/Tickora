import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const createdUsuario = new this.usuarioModel(createUsuarioDto);
    return createdUsuario.save();
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const existingUsuario = await this.usuarioModel.findByIdAndUpdate(
      id,
      updateUsuarioDto,
      { new: true },
    ).exec();
    
    if (!existingUsuario) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado`);
    }
    return existingUsuario;
  }

  async remove(id: string): Promise<Usuario> {
    const deletedUsuario = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!deletedUsuario) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado`);
    }
    return deletedUsuario;
  }
}
