import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cycle } from './cycle.schema';
import { User } from '../user/user.schema';
import { CreateCycleDto } from './dto/cycle.dto';

@Injectable()
export class CycleService {
  constructor(
    @InjectModel(Cycle.name) private cycleModel: Model<Cycle>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  private readonly symptomsList: string[] = [
    'flux légers',
    'flux modérés',
    'flux important',
  ]

  async getSymptomsList() {
    return this.symptomsList;
  }

  async createCycle(userId: string,createCycleDto: CreateCycleDto) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newCycle = new this.cycleModel({
      ...createCycleDto,
      userId,
    });

    return newCycle.save();
  }

  async findCyclesByUser(userId: string) {
    return this.cycleModel.find({ userId }).exec();
  }

  update(id: string, updateData: any) {
    return this.cycleModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  delete(id: string) {
    return this.cycleModel.findByIdAndDelete(id).exec();
  }
}
