import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  Customer,
  CustomerPurchaseDetail,
  CustomerStats,
} from './customer.entity';

interface Product {
  id: number;
  name: string;
  price: number;
  imgSrc: string;
}

interface Purchase {
  productId: number;
  customerId: number;
  quantity: number;
  date: string;
}

@Injectable()
export class CustomerService {
  private readonly dataPath = join(__dirname, '..', '..', '..', 'src', 'data');

  private getCustomers(): Customer[] {
    return JSON.parse(
      readFileSync(join(this.dataPath, 'customers.json'), 'utf-8'),
    );
  }

  private getProducts(): Product[] {
    return JSON.parse(
      readFileSync(join(this.dataPath, 'products.json'), 'utf-8'),
    );
  }

  private getPurchases(): Purchase[] {
    return JSON.parse(
      readFileSync(join(this.dataPath, 'purchases.json'), 'utf-8'),
    );
  }

  async findAll(
    sortBy?: 'asc' | 'desc',
    name?: string,
  ): Promise<CustomerStats[]> {
    const purchases = this.getPurchases();
    const customers = this.getCustomers();
    const products = this.getProducts();

    const customerStats: Record<
      number,
      { count: number; totalAmount: number }
    > = {};

    purchases.forEach((purchase) => {
      if (!customerStats[purchase.customerId]) {
        customerStats[purchase.customerId] = { count: 0, totalAmount: 0 };
      }
      const product = products.find((p) => p.id === purchase.productId);
      if (product) {
        customerStats[purchase.customerId].count += purchase.quantity;
        customerStats[purchase.customerId].totalAmount +=
          purchase.quantity * product.price;
      }
    });

    let topCustomers = Object.keys(customerStats).map((id) => {
      const customer = customers.find((c) => c.id === Number(id));
      return {
        id: Number(id),
        name: customer ? customer.name : 'Unknown',
        ...customerStats[Number(id)],
      };
    });

    if (name) {
      topCustomers = topCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (sortBy) {
      topCustomers.sort((a, b) => {
        const comparison = b.totalAmount - a.totalAmount;
        return sortBy === 'asc' ? -comparison : comparison;
      });
    } else {
      topCustomers.sort((a, b) => a.id - b.id);
    }

    return topCustomers;
  }

  async findPurchasesByCustomerId(
    customerId: number,
  ): Promise<CustomerPurchaseDetail[]> {
    const customers = this.getCustomers();
    const customerExists = customers.some(
      (customer) => customer.id === customerId,
    );

    if (!customerExists) {
      throw new Error('Customer not found');
    }

    const purchases = this.getPurchases();
    const products = this.getProducts();

    const customerPurchases = purchases.filter(
      (purchase) => purchase.customerId === customerId,
    );

    return customerPurchases.map((purchase) => {
      const product = products.find((p) => p.id === purchase.productId);
      return {
        date: purchase.date,
        quantity: purchase.quantity,
        product: product ? product.name : 'Unknown',
        price: product ? product.price * purchase.quantity : 0,
        imgSrc: product ? product.imgSrc : '',
      };
    });
  }
}
