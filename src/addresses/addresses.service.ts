import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from './entities/address.schema';

@Injectable()
export class AddressesService {
  
  constructor(@InjectModel('Address') private catModel: Model<Address>) {}

  create(createAddressDto: CreateAddressDto) {
    const createdCat = new this.catModel(createAddressDto);
    return createdCat.save();
    // return 'This action adds a new address';
  }

  findAll() {
    return this.catModel.find().exec();
    // return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return [];
  }
}
