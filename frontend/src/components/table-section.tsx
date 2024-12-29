import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, SortingState } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { customersQueryOptions } from '@/api/query'
import type { Customer } from '@/api/types'
import { useMemo, useState, type ChangeEvent } from 'react'
import { ArrowUpDown, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export const TableSection = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchName, setSearchName] = useState('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  }

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => row.getValue('id') ?? '-',
      },
      {
        accessorKey: 'name',
        header: '이름',
        cell: ({ row }) => row.getValue('name') ?? '-',
      },
      {
        accessorKey: 'count',
        header: '총 구매 횟수',
        cell: ({ row }) => {
          const count = row.getValue<number>('count')
          return typeof count === 'number' ? `${count}회` : '-'
        },
      },
      {
        accessorKey: 'totalAmount',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              총 구매 금액
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
          )
        },
        cell: ({ row }) => {
          const amount = row.getValue<number>('totalAmount')
          return typeof amount === 'number' ? `${amount.toLocaleString()}원` : '-'
        },
      },
    ],
    [],
  )

  const { data: customers = [] } = useQuery(
    customersQueryOptions({
      sortBy: sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : '',
      name: searchName,
    }),
  )

  const table = useReactTable<Customer>({
    columns,
    data: customers,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    enableMultiSort: false,
  })

  return (
    <Card className="w-full min-w-[500px] max-w-6xl bg-white">
      <CardHeader className="gap-2 flex-row items-center justify-between">
        <CardTitle className="text-xl">구매 목록</CardTitle>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="이름으로 검색" value={searchName} onChange={handleSearch} className="pl-8" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
