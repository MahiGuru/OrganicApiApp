import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { CoreEntitySchema } from 'src/common/entities/core.schema';


@Schema({_id: false})
export class DeliveryTime {
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const DeliveryTimeSchema = SchemaFactory.createForClass(DeliveryTime);
@Schema({_id: false})
export class LogoSettings {
  @Prop()
  id: string;
  @Prop()
  original: string;
  @Prop()
  thumbnail: string;
}
export const LogoSettingSchema = SchemaFactory.createForClass(LogoSettings);

@Schema({_id: false})
export class SeoSettings {
  
  @Prop()
  metaTitle?: string;
  
  @Prop()
  metaDescription?: string;

  @Prop()
  ogTitle?: string;
  
  @Prop()
  ogDescription?: string;
  @Prop()
  ogImage?: Attachment;
  @Prop()
  twitterHandle?: string;
  @Prop()
  twitterCardType?: string;
  @Prop()
  metaTags?: string;
  @Prop()
  canonicalUrl?: string;
}
export const SeoSettingSchema = SchemaFactory.createForClass(SeoSettings);

@Schema({_id: false})
export class GoogleSettings {
  @Prop()
  isEnable: boolean;
  @Prop()
  tagManagerId: string;
}
export const GoogleSettingSchema = SchemaFactory.createForClass(GoogleSettings);

@Schema({_id: false})
export class FacebookSettings {
  @Prop()
  isEnable: boolean;
  @Prop()
  appId: string;
  @Prop()
  pageId: string;
}
export const FacebookSettingSchema = SchemaFactory.createForClass(FacebookSettings);

@Schema({_id: false})
export class ShopSocials {
  @Prop()
  icon: string;
  
  @Prop()
  url: string;
}
export const ShopSocialSchema = SchemaFactory.createForClass(ShopSocials);

@Schema({_id: false})
export class Location {
  
  @Prop()
  lat: number;
  
  @Prop()
  lng: number;
  
  @Prop()
  city?: string;
  
  @Prop()
  state: string;
  
  @Prop()
  country: string;
  
  @Prop()
  zip?: string;
  
  @Prop()
  formattedAddress: string;
}
export const LocationSchema = SchemaFactory.createForClass(Location);


@Schema({_id: false})
export class ContactDetails {
  @Prop({type: {type: [ShopSocialSchema]}})
  socials: ShopSocials[];
  
  @Prop()
  contact: string;

  @Prop({type: LocationSchema})
  location: Location;
  
  @Prop()
  website: string;
}
export const ContactDetailSchema = SchemaFactory.createForClass(ContactDetails);

@Schema({_id: false})
export class SmsAdmin {
  
  @Prop()
  refundOrder: boolean;
  
  @Prop()
  paymentOrder: boolean;
  
  @Prop()
  statusChangeOrder: boolean;
}
export const SmsAdminSchema = SchemaFactory.createForClass(SmsAdmin);

@Schema({_id: false})
export class SmsVendor {
  
  @Prop()
  refundOrder: boolean;
  
  @Prop()
  paymentOrder: boolean;
  
  @Prop()
  statusChangeOrder: boolean;
}
export const SmsVendorSchema = SchemaFactory.createForClass(SmsVendor);

@Schema({_id: false})
export class SmsCustomer {
  
  @Prop()
  refundOrder: boolean;
  
  @Prop()
  paymentOrder: boolean;
  
  @Prop()
  statusChangeOrder: boolean;
}
export const SmsCustomerSchema = SchemaFactory.createForClass(SmsCustomer);


@Schema({_id: false})
export class SmsEvent {

  @Prop({type: SmsAdminSchema})
  admin: SmsAdmin;

  @Prop({type: SmsVendorSchema})
  vendor: SmsVendor;

  @Prop({type: SmsCustomerSchema})
  customer: SmsCustomer;
}
export const SmsEventSchema = SchemaFactory.createForClass(SmsEvent);


@Schema({_id: false})
export class EmailAdmin {
  
  @Prop()
  refundOrder: boolean;
  
  @Prop()
  paymentOrder: boolean;
  
  @Prop()
  statusChangeOrder: boolean;
}
export const EmailAdminSchema = SchemaFactory.createForClass(EmailAdmin);

@Schema({_id: false})
export class EmailVendor {
  
  @Prop()
  refundOrder: boolean;
  
  @Prop()
  createReview: boolean;
  
  @Prop()
  paymentOrder: boolean;
  
  @Prop()
  createQuestion: boolean;
  
  @Prop()
  statusChangeOrder: boolean;
}
export const EmailVendorSchema = SchemaFactory.createForClass(EmailVendor);

@Schema({_id: false})
export class EmailCustomer {
  
  @Prop()
  refundOrder: boolean;
  
  @Prop()
  paymentOrder: boolean;
  
  @Prop()
  answerQuestion: boolean;
  
  @Prop()
  statusChangeOrder: boolean;
}
export const EmailCustomerSchema = SchemaFactory.createForClass(EmailCustomer);


@Schema({_id: false})
export class EmailEvent {
  
  @Prop({type: EmailAdminSchema})
  admin: EmailAdmin;
  
  @Prop({type: EmailVendorSchema})
  vendor: EmailVendor;
  
  @Prop({type: EmailCustomerSchema})
  customer: EmailCustomer;
}
export const EmailEventSchema = SchemaFactory.createForClass(EmailEvent);

@Schema({_id: false})
export class ServerInfo {
  
  @Prop()
  memory_limit: string;
  
  @Prop()
  post_max_size: number;
  
  @Prop()
  max_input_time: string;
  
  @Prop()
  max_execution_time: string;
  
  @Prop()
  upload_max_filesize: number;
}
export const ServerInfoSchema = SchemaFactory.createForClass(ServerInfo);

@Schema({_id: false})
export class PaymentGateway {

  @Prop()
  name: string;

  @Prop()
  title: string;
}
export const PaymentGatewaySchema = SchemaFactory.createForClass(PaymentGateway);

@Schema({_id: false})
export class CurrencyOptions {
  
  @Prop()
  formation: string;
  
  @Prop()
  fractions: number;
}
export const CurrencyOptionsSchema = SchemaFactory.createForClass(CurrencyOptions);


@Schema({_id: false})
export class SettingsOptions {
  
  @Prop({type: ContactDetailSchema})
  contactDetails: ContactDetails;
  
  @Prop()
  currency: string;
  
  @Prop({type: CurrencyOptionsSchema })
  currencyOptions: CurrencyOptions;

  @Prop()
  currencyToWalletRatio: number;
  @Prop()
  defaultAi: string;
  @Prop()
  defaultPaymentGateway: string;
  
  @Prop({type: {type: [DeliveryTimeSchema]} })
  deliveryTime: DeliveryTime[];

  @Prop({type: EmailEventSchema })
  emailEvent: EmailEvent;
  @Prop()
  freeShipping: boolean;
  @Prop()
  freeShippingAmount: number;
  @Prop()
  guestCheckout: boolean;
  @Prop()
  isProductReview: boolean;
  
  @Prop({type: LogoSettingSchema })
  logo: LogoSettings;
  
  @Prop()
  maximumQuestionLimit: number;
  
  @Prop()
  maxShopDistance: number;
  
  @Prop()
  minimumOrderAmount: number;
  
  @Prop({type: {type: [PaymentGatewaySchema]} })
  paymentGateway: PaymentGateway[];
  
  @Prop({type: SeoSettingSchema })
  seo: SeoSettings;
  
  @Prop({type: ServerInfoSchema })
  server_info: ServerInfo;
  
  @Prop()
  shippingClass: number;
  
  @Prop()
  signupPoints: number;
  
  @Prop()
  siteSubtitle: string;
  
  @Prop()
  siteTitle: string;
  
  @Prop({type: SmsEventSchema})
  smsEvent: SmsEvent;

  @Prop()
  StripeCardOnly: boolean;
  
  @Prop()
  taxClass: number;
  
  @Prop()
  useAi: boolean;
  
  @Prop()
  useCashOnDelivery: boolean;
  
  @Prop()
  useEnableGateway: boolean;
  
  @Prop()
  useGoogleMap: boolean;
  
  @Prop()
  useMustVerifyEmail: boolean;
  
  @Prop()
  useOtp: boolean;
}
export const SettingsOptionSchema = SchemaFactory.createForClass(SettingsOptions);


@Schema()
export class Setting extends CoreEntitySchema {
  
  @Prop({ type: SettingsOptionSchema })
  options: SettingsOptions;
  
  @Prop()
  language: string;
  
  @Prop([String])
  translated_languages: string[];
}

export const SettingSchema = SchemaFactory.createForClass(Setting); 