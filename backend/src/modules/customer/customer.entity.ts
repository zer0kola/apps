export class Customer {
  id: number;
  name: string;
}

export class CustomerPurchaseDetail {
  date: string;
  quantity: number;
  product: string;
  price: number;
  imgSrc: string;
}

export class CustomerStats {
  id: number;
  name: string;
  count: number;
  totalAmount: number;
}
