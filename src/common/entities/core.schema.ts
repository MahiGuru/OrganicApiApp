import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';


export class CoreEntitySchema {
  @Prop()
  _id: string;
  
  @Prop()
  @Type(() => Date)
  created_at: Date;
  
  @Prop()
  @Type(() => Date)
  updated_at: Date;
}
