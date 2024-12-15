'use client'

import * as React from 'react'
import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { purchaseFrequencyRangeAtom } from '@/store/purchase-frequency/atom'
import { useAtom } from 'jotai'

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useAtom(purchaseFrequencyRangeAtom)

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return
    setDate({
      from: range.from?.toISOString() ?? date.from,
      to: range.to?.toISOString() ?? date.to,
      isInvalid: false,
    })
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format('YYYY-MM-DD')} - {dayjs(date.to).format('YYYY-MM-DD')}
                </>
              ) : (
                dayjs(date.from).format('YYYY-MM-DD')
              )
            ) : (
              <span>날짜 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={new Date(date.from)}
            selected={{ from: new Date(date.from), to: new Date(date.to) }}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
