export interface PurchaseFrequency {
  range: string
  count: number
}

export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface Purchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}

export interface PurchaseWithId extends Purchase {
  id: string
}
