import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CoreEntitySchema } from 'src/common/entities/core.schema';

@Schema()
export class Analytics extends CoreEntitySchema {
  
  @Prop()
  totalRevenue?: number;
  
  @Prop()
  totalShops?: number;
  
  @Prop()
  todaysRevenue?: number;
  
  @Prop()
  totalOrders?: number;
  
  @Prop()
  newCustomers?: number;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TotalYearSaleByMonth' })
  totalYearSaleByMonth?: TotalYearSaleByMonth[];
}

@Schema()
export class TotalYearSaleByMonth {
  
  @Prop()
  total?: number;
  
  @Prop()
  month?: string;
}

export type AnalyticsDocument = HydratedDocument<Analytics>;
export type TotalYearSaleByMonthDocument = HydratedDocument<TotalYearSaleByMonth>;

export const AnalyticSchema = SchemaFactory.createForClass(Analytics);
export const TotalYearSaleByMonthSchema = SchemaFactory.createForClass(TotalYearSaleByMonth);