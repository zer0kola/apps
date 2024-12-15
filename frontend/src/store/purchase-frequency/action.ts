import { atom } from 'jotai'
import { purchaseFrequencyRangeAtom } from './atom'

/**
 * 시작 날짜 설정
 * 시작 날짜를 설정하고 종료 날짜보다 크면 종료 날짜를 설정한다.
 */
export const setFromAtom = atom<null, string[], void>(null, (get, set, value) => {
  const currentRange = get(purchaseFrequencyRangeAtom)

  set(purchaseFrequencyRangeAtom, (range) => ({
    ...range,
    from: value,
    isInvalid: new Date(value) > new Date(currentRange.to),
  }))
})

/**
 * 종료 날짜 설정
 * 종료 날짜를 설정하고 시작 날짜보다 작으면 시작 날짜를 설정한다.
 */
export const setToAtom = atom<null, string[], void>(null, (get, set, value) => {
  const currentRange = get(purchaseFrequencyRangeAtom)

  set(purchaseFrequencyRangeAtom, (range) => ({
    ...range,
    to: value,
    isInvalid: new Date(value) < new Date(currentRange.from),
  }))
})
