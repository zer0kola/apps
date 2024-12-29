import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DatePickerWithRange } from '@/components/range-picker'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { purchaseFrequencyQueryOptions } from '@/api/query'
import { useAtom } from 'jotai'
import { purchaseFrequencyRangeAtom } from '@/store/purchase-frequency/atom'

export const ChartSection = () => {
  const [date] = useAtom(purchaseFrequencyRangeAtom)

  const { data: purchaseFrequency } = useQuery(
    purchaseFrequencyQueryOptions({ from: date.from, to: date.to, isInvalid: date.isInvalid }),
  )

  return (
    <Card className="w-full min-w-[500px] bg-white">
      <CardHeader className="gap-2 flex-row items-center justify-between">
        <CardTitle className="text-xl">가격대별 구매 빈도</CardTitle>
        <DatePickerWithRange />
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: '구매 횟수',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[200px] w-full"
        >
          <BarChart data={purchaseFrequency} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" tickMargin={10} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" shape={<Rectangle radius={[2, 2, 0, 0]} />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
