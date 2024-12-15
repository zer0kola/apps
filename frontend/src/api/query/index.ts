import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

/**
 * 고객 목록 조회
 * @returns 고객 목록
 */
export const useGetCustomerList = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => axios.get('/api/customers').then((res) => res.data),
  })
}

/**
 * 구매 빈도 조회
 * @returns 구매 빈도
 */
export const useGetPurchaseFrequency = () => {
  return useQuery({
    queryKey: ['purchase-frequency'],
    queryFn: () => axios.get('/api/purchase-frequency').then((res) => res.data),
  })
}

/**
 * 고객 구매 내역 조회
 * @param customerId 고객 ID
 * @returns 고객 구매 내역
 */
export const useGetCustomerPurchases = (customerId: string) => {
  return useQuery({
    queryKey: ['customer-purchases', customerId],
    queryFn: () => axios.get(`/api/customer/${customerId}/purchases`).then((res) => res.data),
  })
}
