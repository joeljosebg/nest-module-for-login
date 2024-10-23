import { User } from '@/modules/users/domain/entities/user.entity';
import { CreateUserDto } from '../../application/dtos/create.dto';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
