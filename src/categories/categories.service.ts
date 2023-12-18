import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import Fuse from 'fuse.js';
import categoriesJson from '@db/categories.json';
import { paginate } from 'src/common/pagination/paginate';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

const categories = plainToClass(Category, categoriesJson);
const options = {
  keys: ['name', 'type.slug'],
  threshold: 0.3,
};
const fuse = new Fuse(categories, options);

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  private categories: Category[] = categories;

  create(createCategoryDto: CreateCategoryDto) {
    const createdUser = new this.categoryModel(createCategoryDto);
    console.log("Created Category >>>> ", createdUser);
    return createdUser.save();
    // return this.categories[0];
  }

  async getCategories({ limit, page, search, parent }: GetCategoriesDto) {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // let data: Category[] = this.categories;
    let data: Category[] = await this.categoryModel.find();
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // data = data.filter((item) => item[key] === value);
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }
    if (parent === 'null') {
      data = data.filter((item) => item.parent === null);
    }
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // if (hasType) {
    //   data = fuse.search(hasType)?.map(({ item }) => item);
    // }

    // const results = data.slice(startIndex, endIndex);
    const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
    
    const results = await this.categoryModel.find().exec();

    console.log("Categories RESULT  ", results, url);
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getCategory(param: string, language: string): Promise<any> {
    const categoryResult = await this.categoryModel.findById(Number(param));
    console.log("Category Result ", categoryResult);
    return categoryResult || {};
    // return this.categories.find(
    //   (p) => p.id === Number(param) || p.slug === param,
    // );
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.findOneAndUpdate(id, updateCategoryDto);
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.categoryModel.findOneAndDelete(id);
  }
}
