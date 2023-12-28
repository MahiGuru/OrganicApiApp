import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import shopsJson from '@db/shops.json';
import nearShopJson from '@db/near-shop.json';
import Fuse from 'fuse.js';
import { GetShopsDto } from './dto/get-shops.dto';
import { paginate } from 'src/common/pagination/paginate';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Shop } from './entities/shop.schema';

const shops = plainToClass(Shop, shopsJson);
const nearShops = plainToClass(Shop, nearShopJson);
const options = {
  keys: ['name', 'type.slug', 'is_active'],
  threshold: 0.3,
};
const fuse = new Fuse(shops, options);

@Injectable()
export class ShopsService {
  constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {}

  private shops: Shop[] = shops;
  private nearShops: Shop[] = shops;

  create(createShopDto: CreateShopDto) {
    const createdShop = new this.shopModel(createShopDto);
    console.log("Created Shops >>>> ", createdShop);
    return createdShop.save();
  }

  async getShops({ search, limit, page }: GetShopsDto) {
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Shop[] = await this.shopModel.find().populate(["address", "staffs"]);
    console.log("DAT SHOPPP ", data);
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // data = data.filter((item) => item[key] === value);
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    const results = data.slice(startIndex, endIndex);
    const url = `/shops?search=${search}&limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getStaffs({ shop_id, limit, page }: GetStaffsDto) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let staffs: any = [];
    let shops: Shop[] = await this.shopModel.find();

    if (shop_id) {
      staffs = shops.find((p: any) => p._id === shop_id)?.staffs ?? [];
    }
    const results = staffs?.slice(startIndex, endIndex);
    const url = `/staffs?limit=${limit}`;

    return {
      data: results,
      ...paginate(staffs?.length, page, limit, results?.length, url),
    };
  }

  async getShop(slug: any): Promise<Shop> {
    const findSlugVal = await this.shopModel.find().populate("owner");
    console.log(findSlugVal);
    const result = findSlugVal.find((p) => p.name === slug || p._id === slug || p.description === slug);
    console.log(result, slug);
    return result;
  }

  async getNearByShop(lat: string,lng: string) {
    return await this.shopModel.findOne({ lat, lng });
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateShopDto: UpdateShopDto) {
    return await this.shopModel.findOneAndUpdate(id, updateShopDto);   
  }

  async approve(id: mongoose.Schema.Types.ObjectId) {
    return await this.shopModel.findOneAndDelete(id); 
    return `This action removes a #${id} shop`;
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.shopModel.findOneAndDelete(id); 
  }

  async disapproveShop(id: mongoose.Schema.Types.ObjectId) {
    return await this.shopModel.findOneAndUpdate(id, {
      is_active: false
    });   
  }

  async approveShop(id: mongoose.Schema.Types.ObjectId) {
    return await this.shopModel.findOneAndUpdate(id, {
      is_active: true
    });
  }
}
