import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { CycleService } from './cycle.service';
import { CreateCycleDto } from './dto/cycle.dto';

@Controller('cycles')
export class CycleController {
  constructor(private readonly cycleService: CycleService) {}

  @Get('user/:userId')
  async getCyclesByUser(@Param('userId') userId: string) {
    try {
      return await this.cycleService.findCyclesByUser(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('user/:userId')
  async createCycle(@Param('userId') userId: string, @Body() createCycleDto: CreateCycleDto) {
    try {
      return await this.cycleService.createCycle(userId, createCycleDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async updateCycle(@Param('id') id: string, @Body() updateData: any) {
    try {
      return await this.cycleService.update(id, updateData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async deleteCycle(@Param('id') id: string) {
    try {
      return await this.cycleService.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('symptoms')
  getSymptomsList() {
    return this.cycleService.getSymptomsList();
  }
}
