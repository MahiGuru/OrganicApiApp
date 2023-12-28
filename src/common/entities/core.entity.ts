import { Type } from 'class-transformer';

export class CoreEntity {
  id: string | number | any;
  @Type(() => Date)
  created_at: Date;
  @Type(() => Date)
  updated_at: Date;
}
