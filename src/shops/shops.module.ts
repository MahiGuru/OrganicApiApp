import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import {
  ApproveShopController,
  DisapproveShopController,
  ShopsController,
  StaffsController,
  NearByShopController,
} from './shops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopSchema } from './entities/shop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema }])
  ],
  controllers: [
    ShopsController,
    StaffsController,
    DisapproveShopController,
    ApproveShopController,
    NearByShopController,
  ],
  providers: [ShopsService],
})
export class ShopsModule {}
