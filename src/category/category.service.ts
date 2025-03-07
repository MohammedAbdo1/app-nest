import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // تأكد من أن PrismaService موجود في المسار الصحيح
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // إضافة فئة جديدة
  async create(createCategoryDto: CreateCategoryDto) {
    const { name, image } = createCategoryDto;
    return await this.prisma.category.create({
      data: {
        name,
        image,
      },
    });
  }

  // جلب جميع الفئات
  async findAll() {
    return await this.prisma.category.findMany();
  }

  // جلب فئة واحدة حسب المعرف
  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  // تحديث فئة حسب المعرف
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { name, image } = updateCategoryDto;

    // تحقق من وجود الفئة أولاً
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // تحديث الفئة
    return await this.prisma.category.update({
      where: { id },
      data: {
        name,
        image,
      },
    });
  }

  // حذف فئة
  async remove(id: number) {
    // تحقق من وجود الفئة أولاً
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // حذف الفئة
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
