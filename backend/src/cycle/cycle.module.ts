import { Module } from '@nestjs/common';
import { CycleController } from './cycle.controller';
import { CycleService } from './cycle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cycle, CycleSchema } from './cycle.schema';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Cycle.name, schema: CycleSchema }]),
        UserModule,
    ],
    controllers: [CycleController],
    providers: [CycleService],
})

export class CycleModule {}