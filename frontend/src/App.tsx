import { ChartSection } from '@/components/chart-section'
import { TableSection } from '@/components/table-section'

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-5 gap-10">
      <ChartSection />
      <TableSection />
    </main>
  )
}

export default App
