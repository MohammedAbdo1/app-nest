import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';


@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSubCategoryDto) {
    return this.prisma.subCategory.create({ data: dto });
  }

  async findAll() {
    return this.prisma.subCategory.findMany({ include: { category: true } });
  }

  async findOne(id: number) {
    const subCategory = await this.prisma.subCategory.findUnique({ where: { id } });
    if (!subCategory) throw new NotFoundException('SubCategory not found');
    return subCategory;
  }

  async update(id: number, dto: UpdateSubCategoryDto) {
    return this.prisma.subCategory.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.subCategory.delete({ where: { id } });
  }
}
