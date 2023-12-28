import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from './entities/address.schema';
import { UserAddress } from './entities/address.entity';

@Injectable()
export class AddressesService {
  
  constructor(@InjectModel(Address.name) private addressModel: Model<Address>) {}

  create(createAddressDto: CreateAddressDto) {
    const createdCat = new this.addressModel(createAddressDto);
    return createdCat.save();
  }

  findAll() {
    return this.addressModel.find().exec();
    // return `This action returns all addresses`;
  }

  findOne(id: number | string) {
    return this.addressModel.findById(id).exec();
  }

  update(id: number | string, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number | string) {
    return this.addressModel.deleteOne({filter: id}).exec();
    return [];
  }
}
