import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  findAll() {
    return `This action returns all uploads`;
  }

  findOne(id: number | string) {
    return `This action returns a #${id} upload`;
  }

  remove(id: number | string) {
    return `This action removes a #${id} upload`;
  }
}
