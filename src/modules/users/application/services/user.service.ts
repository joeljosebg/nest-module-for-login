import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../../domain/interfaces/user-service.interface';
import { USER_REPOSITORY } from '../../constants';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async create(user: CreateUserDto): Promise<User> {
    // Quiero agregar bcrypt para hashear la contraseña
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    return await this.userRepository.create(user);
  }

  async update(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
