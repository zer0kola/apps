import { useQuery } from '@tanstack/react-query'
import {
  // 고객 목록 조회
  customersQueryOptions,
  // 고객 구매 목록 조회
  customerPurchasesQueryOptions,
  // 구매 빈도 조회
  purchaseFrequencyQueryOptions,
} from '@/api/query'

function App() {
  const { data, isLoading } = useQuery(customersQueryOptions())

  return <main className="flex min-h-screen flex-col items-center justify-center bg-background"></main>
}

export default App
