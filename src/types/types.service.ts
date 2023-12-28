import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

import typesJson from '@db/types.json';
import Fuse from 'fuse.js';
import { GetTypesDto } from './dto/get-types.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

const types = plainToClass(Type, typesJson);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(types, options);

@Injectable()
export class TypesService {
  
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  private types: Type[] = types;

  async getTypes({ text, search }: GetTypesDto) {
    let data: Type[] = await this.typeModel.find();
    if (text?.replace(/%/g, '')) {
      data = fuse.search(text)?.map(({ item }) => item);
    }

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    return data;
  }

  async getTypeBySlug(slug: string): Promise<Type> {
    return await this.typeModel.findOne({ slug });
  }

  create(createTypeDto: CreateTypeDto) {
    const createdType = new this.typeModel(createTypeDto);
    console.log("Created Type >>>> ", createdType);
    return createdType.save();
  }

  async findAll() {
    return await this.typeModel.find();
  }

  async findOne(id: number | string) {
    return await this.typeModel.findById(id);
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateTypeDto: UpdateTypeDto) {
    return await this.typeModel.findOneAndUpdate(id, updateTypeDto); 
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.typeModel.findOneAndDelete(id); 
  }
}
