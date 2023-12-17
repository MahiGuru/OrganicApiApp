import { Prop } from '@nestjs/mongoose';
import { CoreEntitySchema } from './core.schema';

export class AttachmentSchema extends CoreEntitySchema {
  @Prop()
  thumbnail?: string;
  
  @Prop()
  original?: string;
}
