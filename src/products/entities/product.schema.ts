import { AttributeValue } from 'src/attributes/entities/attribute-value.entity';
import { Category } from 'src/categories/entities/category.entity';
import { AttachmentSchema } from 'src/common/entities/attachment.schema';
import { CoreEntitySchema } from 'src/common/entities/core.schema';
import { Order } from 'src/orders/entities/order.schema';
import { Shop } from 'src/shops/entities/shop.schema';
import { Tag } from 'src/tags/entities/tag.schema';
import { Type } from 'src/types/entities/type.schema';
import { Review } from '../../reviews/entities/review.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

enum ProductStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

enum ProductType {
  SIMPLE = 'simple',
  VARIABLE = 'variable',
}

export class OrderProductPivot {
  @Prop()
  variation_option_id?: number;
  @Prop()
  order_quantity: number;
  @Prop()
  unit_price: number;
  @Prop()
  subtotal: number;
}

export class Variation {
  @Prop()
  id: number;
  @Prop()
  title: string;
  @Prop()
  price: number;
  @Prop()
  sku: string;
  @Prop()
  is_disable: boolean;
  @Prop()
  sale_price?: number;
  @Prop()
  quantity: number;
  @Prop()
  options: VariationOption[];
}

export class VariationOption {
  @Prop()
  name: string;
  @Prop()
  value: string;
}

@Schema()
export class Product extends CoreEntitySchema {
  @Prop()
  name: string;
  @Prop()
  slug: string;
  @Prop()
  type: Type;
  @Prop()
  type_id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' })
  product_type: ProductType; 

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags?: Tag[];
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AttributeValue' }] })
  variations?: AttributeValue[];
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variation' }] })
  variation_options?: Variation[];
  @Prop()
  pivot?: OrderProductPivot;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders?: Order[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;
  
  @Prop()
  shop_id: number; 
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  related_products?: Product[];
  @Prop()
  description: string;
  @Prop()
  in_stock: boolean;
  @Prop()
  is_taxable: boolean;
  @Prop()
  sale_price?: number;
  @Prop()
  max_price?: number;
  @Prop()
  min_price?: number;
  @Prop()
  sku?: string;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AttachmentSchema' }] })
  gallery?: AttachmentSchema[];
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AttachmentSchema' })
  image?: AttachmentSchema;

  @Prop()
  status: ProductStatus;

  @Prop()
  height?: string;
  @Prop()
  length?: string;
  @Prop()
  width?: string;
  @Prop()
  price?: number;
  @Prop()
  quantity: number;
  @Prop()
  unit: string;
  @Prop()
  ratings: number;
  @Prop()
  in_wishlist: boolean;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  my_review?: Review[];
  
  @Prop()
  language?: string;
  
  @Prop([String])
  translated_languages?: string[];
}

@Schema()
export class File extends CoreEntitySchema {
  @Prop()
  attachment_id: number;
  @Prop()
  url: string;
  @Prop()
  fileable_id: number;
}
export type ProductDocument = HydratedDocument<Product>;
export type FileDocument = HydratedDocument<File>;

export const ProductSchema = SchemaFactory.createForClass(Product);
export const FileSchema = SchemaFactory.createForClass(File);