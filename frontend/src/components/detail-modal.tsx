import { useQuery } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { customerPurchasesQueryOptions } from '@/api/query'
import { Card, CardContent } from '@/components/ui/card'
import { Customer } from '@/api/types'

interface DetailModalProps {
  customer?: Customer
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DetailModal = ({ customer, open, onOpenChange }: DetailModalProps) => {
  const { data: customerPurchases = [] } = useQuery({
    ...customerPurchasesQueryOptions({ id: customer?.id ?? 0 }),
    enabled: !!customer?.id,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>고객 상세 정보</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span className="font-medium">{customer?.name}</span>
            <span className="text-sm text-muted-foreground">총 {customerPurchases.length}건의 구매</span>
          </DialogDescription>
        </DialogHeader>
        <div className="h-[600px] w-full rounded-md border p-4 overflow-y-auto">
          {customerPurchases.map((purchase, index) => (
            <Card key={index} className="mb-4 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <img
                      src={purchase.imgSrc}
                      alt={purchase.product}
                      className="object-cover rounded-md w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{purchase.product}</h4>
                        <time className="text-sm text-muted-foreground">{purchase.date}</time>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-lg">{purchase.price.toLocaleString()}원</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {customerPurchases.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <span className="text-lg">구매 내역이 없습니다</span>
              <span className="text-sm mt-2">아직 구매하신 상품이 없습니다.</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
