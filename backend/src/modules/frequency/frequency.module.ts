import { Module } from '@nestjs/common';
import { FrequencyController } from './frequency.controller';
import { FrequencyService } from './frequency.service';

@Module({
  controllers: [FrequencyController],
  providers: [FrequencyService],
})
export class FrequencyModule {}
