import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@/modules/common/enum';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'El ID único del usuario' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John', description: 'El nombre del usuario' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'El apellido del usuario' })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'El nombre de usuario del usuario',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'El correo electrónico del usuario',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'your-secure-password',
    description: 'La contraseña del usuario',
    required: false,
  })
  @Column({ nullable: true })
  password: string;

  @ApiProperty({ enum: UserRole, description: 'El rol del usuario' })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ enum: UserStatus, description: 'El estado del usuario' })
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.REGISTERED,
  })
  status: UserStatus;
}
