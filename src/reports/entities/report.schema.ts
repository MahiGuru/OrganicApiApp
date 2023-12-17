import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreEntity } from 'src/common/entities/core.entity';

@Schema()
export class MyReports extends CoreEntity {
  
  @Prop()
  message: string;
}

export type MyReportsDocument = HydratedDocument<MyReports>; 

export const MyReportsSchema = SchemaFactory.createForClass(MyReports); 