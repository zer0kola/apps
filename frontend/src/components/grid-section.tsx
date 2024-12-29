import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AgGridReact } from 'ag-grid-react'
import { useQuery } from '@tanstack/react-query'
import { customersQueryOptions } from '@/api/query'
import { useMemo, useState, useCallback } from 'react'
import { ColDef, ValueFormatterParams, ClientSideRowModelModule, RowClickedEvent } from 'ag-grid-community'
import type { Customer } from '@/api/types'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { debounce } from 'es-toolkit'
import { DetailModal } from '@/components/detail-modal'
export const GridSection = () => {
  const [searchName, setSearchName] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const debouncedSetSearchName = useMemo(() => debounce((value: string) => setSearchName(value), 300), [setSearchName])

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetSearchName(e.target.value)
    },
    [debouncedSetSearchName],
  )

  const handleRowClick = useCallback((event: RowClickedEvent<Customer>) => {
    const customerData = event.data
    if (customerData) {
      setSelectedCustomerId(customerData.id)
      setIsModalOpen(true)
    }
  }, [])

  const columnDefs = useMemo<ColDef<Customer>[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        filter: true,
        width: 100,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: 'name',
        headerName: '이름',
        filter: true,
        flex: 1,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: 'count',
        headerName: '총 구매 횟수',
        filter: 'agNumberColumnFilter',
        valueFormatter: (params: ValueFormatterParams<Customer, number>) =>
          params.value != null ? `${params.value}회` : '-',
        flex: 1,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: 'totalAmount',
        headerName: '총 구매 금액',
        filter: 'agNumberColumnFilter',
        valueFormatter: (params: ValueFormatterParams<Customer, number>) =>
          params.value != null ? `${params.value.toLocaleString()}원` : '-',
        flex: 1,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
    ],
    [],
  )

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      minWidth: 100,
    }),
    [],
  )

  const { data: customers = [] } = useQuery(
    customersQueryOptions({
      name: searchName,
    }),
  )

  return (
    <Card className="w-full min-w-[500px] bg-white">
      <CardHeader className="gap-2 flex-row items-center justify-between">
        <CardTitle className="text-xl">구매 목록</CardTitle>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="이름으로 검색" onChange={handleSearch} className="pl-8" />
        </div>
      </CardHeader>
      <CardContent className="w-full h-[350px]">
        <AgGridReact
          className="ag-theme-material"
          modules={[ClientSideRowModelModule]}
          rowData={customers}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onRowClicked={handleRowClick}
        />
      </CardContent>
      <DetailModal customerId={selectedCustomerId} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </Card>
  )
}
