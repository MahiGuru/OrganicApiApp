import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';
import { CoreEntitySchema } from 'src/common/entities/core.schema';

@Schema()
export class Feedback extends CoreEntitySchema {
  @Prop()
  user_id: string;
  @Prop()
  model_type: string;
  @Prop()
  model_id: string;
  @Prop()
  positive?: boolean;
  @Prop()
  negative?: boolean;
}

export type FeedbackDocument = HydratedDocument<Feedback>;

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);