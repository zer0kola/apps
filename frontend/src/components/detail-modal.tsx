import { useQuery } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { customerPurchasesQueryOptions } from '@/api/query'
import { Card, CardContent } from '@/components/ui/card'

interface DetailModalProps {
  customerId?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DetailModal = ({ customerId, open, onOpenChange }: DetailModalProps) => {
  const { data: customerPurchases = [] } = useQuery({
    ...customerPurchasesQueryOptions({ id: customerId ?? 0 }),
    enabled: !!customerId,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>고객 상세 정보</DialogTitle>
          <DialogDescription>고객 ID: {customerId}</DialogDescription>
        </DialogHeader>
        <div className="h-[400px] w-full rounded-md border p-4 overflow-y-auto">
          {customerPurchases.map((purchase, index) => (
            <Card key={index} className="mb-2">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{purchase.product}</span>
                  <span className="text-muted-foreground">{purchase.price.toLocaleString()}원</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{new Date(purchase.date).toLocaleDateString()}</div>
              </CardContent>
            </Card>
          ))}
          {customerPurchases.length === 0 && (
            <div className="text-center text-muted-foreground py-8">구매 내역이 없습니다</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
