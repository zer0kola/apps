import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { FrequencyStats, PriceRange } from './frequency.entity';

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
export class FrequencyService {
  private readonly dataPath = join(__dirname, '..', '..', '..', 'src', 'data');
  private readonly priceRanges: PriceRange[] = [
    { min: 0, max: 20000 },
    { min: 20001, max: 30000 },
    { min: 30001, max: 40000 },
    { min: 40001, max: 50000 },
    { min: 50001, max: 60000 },
    { min: 60001, max: 70000 },
    { min: 70001, max: 80000 },
    { min: 80001, max: 90000 },
    { min: 90001, max: 100000 },
  ];

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

  async getPurchaseFrequency(
    from?: string,
    to?: string,
  ): Promise<FrequencyStats[]> {
    const purchases = this.getPurchases();
    const products = this.getProducts();

    const frequency = this.priceRanges.map((range) => ({
      range: `${range.min} - ${range.max}`,
      count: 0,
    }));

    purchases
      .filter((purchase) => {
        if (!from || !to) return true;
        const purchaseDate = new Date(purchase.date);
        const fromDate = new Date(from);
        const toDate = new Date(to);
        return purchaseDate >= fromDate && purchaseDate <= toDate;
      })
      .forEach((purchase) => {
        const product = products.find((p) => p.id === purchase.productId);
        if (product) {
          const productPrice = product.price;
          const range = this.priceRanges.find(
            (r) => productPrice >= r.min && productPrice <= r.max,
          );
          if (range) {
            const rangeIndex = this.priceRanges.indexOf(range);
            frequency[rangeIndex].count += purchase.quantity;
          }
        }
      });

    return frequency;
  }
}
