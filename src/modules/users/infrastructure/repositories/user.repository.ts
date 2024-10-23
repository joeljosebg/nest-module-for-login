import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IUserRepository } from '@/modules/users/domain/interfaces/user-repository.interface';
import { Injectable } from '@nestjs/common';
import { User } from '@/modules/users/domain/entities/user.entity';
import { CreateUserDto } from '../../application/dtos/create.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.repository.save(user);
  }

  async update(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
