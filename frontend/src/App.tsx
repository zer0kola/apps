import { ChartSection } from '@/components/chart-section'
import { GridSection } from '@/components/grid-section'

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-5 gap-3">
      <ChartSection />
      <GridSection />
    </main>
  )
}

export default App
