import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsInt()
  @Min(1)
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  API_KEY: string;
}
