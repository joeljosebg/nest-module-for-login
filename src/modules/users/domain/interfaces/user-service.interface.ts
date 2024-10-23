import { CreateUserDto } from '../../application/dtos/create.dto';
import { User } from '../entities/user.entity';

export interface IUserService {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
