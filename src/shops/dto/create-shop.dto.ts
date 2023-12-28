import { PickType } from '@nestjs/swagger';
import { Shop } from '../entities/shop.entity';

export class CreateShopDto extends PickType(Shop, [
  'name',
  'address',
  'description',
  'cover_image',
  'logo',
  'settings',
  'balance',
  'staffs'
]) {
  categories: string[];
}

export class ApproveShopDto {
  id: number | string;
  admin_commission_rate: number;
}
