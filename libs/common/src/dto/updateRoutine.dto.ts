import { IsMongoId, IsString } from 'class-validator';

export class UpdateRoutineDto {
  @IsString()
  routine: string;
}
