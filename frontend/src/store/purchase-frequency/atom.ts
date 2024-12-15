import { atom } from 'jotai'

export type PurchaseFrequencyRange = {
  from: string
  to: string
  isInvalid: boolean
}

/**
 * 구매 빈도 범위
 * 기본값은 2024년 7월 1일부터 2024년 7월 31일까지
 */
export const purchaseFrequencyRangeAtom = atom<PurchaseFrequencyRange>({
  from: '2024-07-01',
  to: '2024-07-31',
  isInvalid: false,
})
