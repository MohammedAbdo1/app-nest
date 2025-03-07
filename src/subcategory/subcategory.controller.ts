import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly SubCategoryService: SubCategoryService) {}

  @Post()
  create(@Body() CreateSubCategoryDto: CreateSubCategoryDto) {
    return this.SubCategoryService.create(CreateSubCategoryDto);
  }

  @Get()
  findAll() {
    return this.SubCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SubCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubCategoryDto) {
    return this.SubCategoryService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.SubCategoryService.remove(+id);
  }
}
