import { IsOptional, IsString } from 'class-validator';

export class TimelineQueryDto {
  @IsOptional()
  @IsString()
  cursor?: string;
}
