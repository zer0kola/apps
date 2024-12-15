import type { PurchaseFrequency } from '@/api/types'

const DIVISOR = 10000

/*
 *   PurchaseFrequency 데이터를 KRW로 변환합니다.
 *   @param data - 변환할 데이터
 *   @param min - 최소 범위 (기본값: 20000)
 *   @param max - 최대 범위 (기본값: 100000)
 *   @returns 변환된 데이터
 *  */
export const convertPurchaseFrequencyDataToKRW = (
  data: PurchaseFrequency[],
  min: number = 2 * DIVISOR,
  max: number = 10 * DIVISOR,
): PurchaseFrequency[] => {
  // min은 0보다 커야 한다.
  if (min < 0) {
    throw new Error('min 값은 0보다 커야 합니다.')
  }

  // min은 max보다 작아야 한다.
  if (min >= max) {
    throw new Error('min 값은 max 값보다 작아야 합니다.')
  }

  // min과 max가 DIVISOR로 나누어 떨어지는지 확인
  if (min % DIVISOR !== 0 || max % DIVISOR !== 0) {
    throw new Error(`min과 max 값은 ${DIVISOR}으로 나누어 떨어져야 합니다.`)
  }

  // "min 이하"부터 "max 이상"까지의 범위 배열 생성
  const ranges = [
    `${min / DIVISOR}만원 이하`,
    ...Array.from({ length: (max - min) / DIVISOR }, (_, i) => `${min / DIVISOR + i}만원대`),
    `${max / DIVISOR}만원 이상`,
  ]

  // 범위와 count를 0으로 초기화하여 데이터 생성
  const initialProcessedData = ranges.map((range) => ({ range, count: 0 }))

  // 각 데이터 항목을 적절한 범위에 합산
  return data.reduce((acc, item) => {
    const [start] = item.range.split(' - ').map(Number)

    // 현재 범위에 대한 인덱스를 계산하여 설정
    const index = start > max ? acc.length - 1 : Math.max(0, Math.floor((start - min) / DIVISOR) + 1)

    // 적절한 범위에 count를 업데이트
    acc[index].count += item.count

    return acc
  }, initialProcessedData)
}
