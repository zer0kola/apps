import { nanoid } from 'nanoid'
import apiInstance from '@/lib/api-instance'
import { convertPurchaseFrequencyDataToKRW } from '@/lib/chart'
import { queryOptions, keepPreviousData } from '@tanstack/react-query'
import type { Customer, Purchase, PurchaseWithId, PurchaseFrequencyRange } from '@/api/types'

/**
 * 구매 빈도 조회 옵션
 * @param from 시작 날짜
 * @param to 종료 날짜
 * @param isInvalid 유효한 날짜인지
 * @returns 구매 빈도
 */
export const purchaseFrequencyQueryOptions = ({ from, to, isInvalid }: PurchaseFrequencyRange) =>
  queryOptions({
    queryKey: ['purchaseFrequency', from, to],
    queryFn: () => apiInstance.get('purchase-frequency', { params: { from, to } }).then((res) => res.data),
    select: (data) => convertPurchaseFrequencyDataToKRW(data),
    throwOnError: true,
    enabled: !isInvalid,
  })

/**
 * 고객 목록 조회 옵션
 * @param searchParams 검색 조건
 * @returns 고객 목록
 */
export const customersQueryOptions = (searchParams = { sortBy: '', name: '' }) =>
  queryOptions<Customer[], unknown, Customer[]>({
    queryKey: ['customers', searchParams.sortBy, searchParams.name],
    queryFn: () =>
      apiInstance
        .get('customers', {
          params: searchParams,
        })
        .then((res) => res.data),
    select: (data) => data,
    placeholderData: keepPreviousData,
  })

export const customerPurchasesQueryOptions = ({ id }: Partial<Pick<Customer, 'id'>>) =>
  queryOptions<Purchase[], unknown, PurchaseWithId[]>({
    queryKey: ['customerPurchases', id],
    queryFn: () => apiInstance.get(`customers/${id}/purchases`).then((res) => res.data),
    select: (data) => data.map((purchase) => ({ ...purchase, id: nanoid() })),
    throwOnError: true,
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
