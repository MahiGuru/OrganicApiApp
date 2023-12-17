import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Report extends CoreEntitySchema {
  
  @Prop()
  user_id?: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User[];
  
  @Prop()
  model_id: number;
  
  @Prop()
  model_type: string;
  
  @Prop()
  message: string;
}

export type ReportDocument = HydratedDocument<Report>; 

export const ReportSchema = SchemaFactory.createForClass(Report); 