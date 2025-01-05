import { atom } from "jotai";
import dayjs from "dayjs";

export const purchaseFrequencyRangeAtom = atom({
  from: dayjs().subtract(1, "month").toISOString(),
  to: dayjs().toISOString(),
  isInvalid: false,
});
