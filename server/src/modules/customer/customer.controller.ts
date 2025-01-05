import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerPurchaseDetail, CustomerStats } from './customer.entity';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers(
    @Query('sortBy') sortBy?: 'asc' | 'desc',
    @Query('name') name?: string,
  ): Promise<CustomerStats[]> {
    return this.customerService.findAll(sortBy, name);
  }

  @Get(':id/purchases')
  async getCustomerPurchases(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CustomerPurchaseDetail[]> {
    return this.customerService.findPurchasesByCustomerId(id);
  }
}
