import { Module } from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SubcategoryController],
  providers: [SubCategoryService,PrismaService],
})
export class SubcategoryModule {}
