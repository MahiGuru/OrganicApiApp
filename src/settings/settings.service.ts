import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
import settingsJson from '@db/settings.json';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

const settings = plainToClass(Setting, settingsJson);

@Injectable()
export class SettingsService {
  constructor(@InjectModel(Setting.name) private settingModel: Model<Setting>) {}

  private settings: Setting = settings;

  async create(createSettingDto: CreateSettingDto) { 
    const createdSetting = new this.settingModel(createSettingDto);
    console.log("Created setting >>>> ", createdSetting);
    return createdSetting.save();
  }

  async findAll() {
    return await this.settingModel.find();
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.settingModel.findOne({id});
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateSettingDto: UpdateSettingDto) {
    return await this.settingModel.findOneAndUpdate(id, updateSettingDto); 
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.settingModel.findOneAndDelete(id); 
  }
}
