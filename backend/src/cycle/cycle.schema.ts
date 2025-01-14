import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Cycle extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: true })
  symptoms: string;
}

export const CycleSchema = SchemaFactory.createForClass(Cycle);
