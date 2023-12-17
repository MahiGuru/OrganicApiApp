import { UserAddress } from 'src/addresses/entities/address.entity';
import {  CoreEntitySchema } from 'src/common/entities/core.schema';
import { Coupon } from 'src/coupons/entities/coupon.schema';
import { PaymentIntent } from 'src/payment-intent/entries/payment-intent.entity';
import { File, Product } from 'src/products/entities/product.schema';
import { Shop } from 'src/shops/entities/shop.schema';
import { User } from 'src/users/entities/user.schema';
import { OrderStatus } from './order-status.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum PaymentGatewayType {
  STRIPE = 'STRIPE',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CASH = 'CASH',
  FULL_WALLET_PAYMENT = 'FULL_WALLET_PAYMENT',
  PAYPAL = 'PAYPAL',
  RAZORPAY = 'RAZORPAY',
}
export enum OrderStatusType {
  PENDING = 'order-pending',
  PROCESSING = 'order-processing',
  COMPLETED = 'order-completed',
  CANCELLED = 'order-cancelled',
  REFUNDED = 'order-refunded',
  FAILED = 'order-failed',
  AT_LOCAL_FACILITY = 'order-at-local-facility',
  OUT_FOR_DELIVERY = 'order-out-for-delivery',
  DEFAULT_ORDER_STATUS = 'order-pending',
}

export enum PaymentStatusType {
  PENDING = 'payment-pending',
  PROCESSING = 'payment-processing',
  SUCCESS = 'payment-success',
  FAILED = 'payment-failed',
  REVERSAL = 'payment-reversal',
  CASH_ON_DELIVERY = 'payment-cash-on-delivery',
  CASH = 'payment-cash',
  WALLET = 'payment-wallet',
  AWAITING_FOR_APPROVAL = 'payment-awaiting-for-approval',
  DEFAULT_PAYMENT_STATUS = 'payment-pending',
}
@Schema()
export class Order extends CoreEntitySchema {
  @Prop()
  tracking_number: string;

  @Prop()
  customer_id: number;

  @Prop()
  customer_contact: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  parent_order?: Order;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  children: Order[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus' })
  status: OrderStatus;

  @Prop()
  order_status: OrderStatusType;

  @Prop()
  payment_status: PaymentStatusType;

  @Prop()
  amount: number;

  @Prop()
  sales_tax: number;

  @Prop()
  total: number;
  @Prop()
  paid_total: number;
  @Prop()
  payment_id?: string;
  @Prop()
  payment_gateway: PaymentGatewayType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' })
  coupon?: Coupon;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;
  
  @Prop()
  discount?: number;
  
  @Prop()
  delivery_fee: number;
  
  @Prop()
  delivery_time: string;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  billing_address: UserAddress;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  shipping_address: UserAddress;
  
  @Prop()
  language: string;
  
  @Prop([String])
  translated_languages: string[];
  
  @Prop()
  payment_intent: PaymentIntent;
  
  @Prop()
  altered_payment_gateway?: string;
}

@Schema()
export class OrderFiles extends CoreEntitySchema {
  @Prop()
  purchase_key: string;
  @Prop()
  digital_file_id: number;
  @Prop()
  order_id?: number;
  @Prop()
  customer_id: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  file: File;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  fileable: Product;
}
export type OrderDocument = HydratedDocument<Order>;
export type OrderFilesDocument = HydratedDocument<OrderFiles>;

export const OrderSchema = SchemaFactory.createForClass(Order);
export const OrderFilesSchema = SchemaFactory.createForClass(OrderFiles);