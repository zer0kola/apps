import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { FrequencyService } from './frequency.service';
import { FrequencyStats } from './frequency.entity';

@Controller('api/purchase-frequency')
export class FrequencyController {
  constructor(private readonly frequencyService: FrequencyService) {}

  @Get()
  async getPurchaseFrequency(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<FrequencyStats[]> {
    if ((from && !to) || (!from && to)) {
      throw new BadRequestException('Both from and to must be provided');
    }

    if (from && to) {
      if (isNaN(Date.parse(from)) || isNaN(Date.parse(to))) {
        throw new BadRequestException(
          'Invalid date format. Dates must be in ISO 8601 format',
        );
      }

      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (fromDate > toDate) {
        throw new BadRequestException('From date must be before to date');
      }
    }

    return this.frequencyService.getPurchaseFrequency(from, to);
  }
}
