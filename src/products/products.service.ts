import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { paginate } from 'src/common/pagination/paginate';
import productsJson from '@db/products.json';
import Fuse from 'fuse.js';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from './entities/product.schema';

const products = plainToClass(Product, productsJson);

const options = {
  keys: [
    'name',
    'type.slug',
    'categories.slug',
    'status',
    'shop_id',
    'author.slug',
    'tags',
    'manufacturer.slug',
  ],
  threshold: 0.3,
};

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
  }


  create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    console.log("Created Product >>>> ", createdProduct);
    return createdProduct.save(); 
  }

  async getProducts({ limit, page, search }: GetProductsDto): Promise<ProductPaginator> {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Product[] = await this.productModel.find();
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
    }

    const results: any = data.slice(startIndex, endIndex);
    const url = `/products?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({ slug });
    let allProducts: Product[] = await this.productModel.find();
    const related_products = allProducts
      .filter((p) => p.type.slug === product.type.slug)
      .slice(0, 20);
    return {
      ...product,
      related_products,
    };
  }

  async getPopularProducts({ limit, type_slug }: GetPopularProductsDto): Promise<Product[]> {
    let data: any = await this.productModel.find();;
    if (type_slug) {
      data = data.map(({ item }) => item);
    }
    return data?.slice(0, limit);
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateProductDto: UpdateProductDto) {
    return await this.productModel.findOneAndUpdate(id, updateProductDto); 
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.productModel.findOneAndDelete(id); 
  }
}
