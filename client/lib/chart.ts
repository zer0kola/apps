import type { PurchaseFrequency } from "@/api/types";

export const convertPurchaseFrequencyDataToKRW = (data: PurchaseFrequency[]) => {
  return data.map((item) => ({
    ...item,
    range: `${item.range}원`,
  }));
};
