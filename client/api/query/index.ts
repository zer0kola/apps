import { nanoid } from "nanoid";
import apiInstance from "@/lib/api-instance";
import { convertPurchaseFrequencyDataToKRW } from "@/lib/chart";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import type { Customer, Purchase, PurchaseWithId, PurchaseFrequencyRange } from "@/api/types";

/**
 * 구매 빈도 조회 옵션
 */
export const purchaseFrequencyQueryOptions = ({ from, to, isInvalid }: PurchaseFrequencyRange) =>
  queryOptions({
    queryKey: ["purchaseFrequency", from, to],
    queryFn: () =>
      apiInstance.get("purchase-frequency", { params: { from, to } }).then((res) => res.data),
    select: (data) => convertPurchaseFrequencyDataToKRW(data),
    throwOnError: true,
    enabled: !isInvalid,
  });

/**
 * 고객 목록 조회 옵션
 */
export const customersQueryOptions = (searchParams = { name: "" }) =>
  queryOptions<Customer[], unknown, Customer[]>({
    queryKey: ["customers", searchParams.name],
    queryFn: () =>
      apiInstance
        .get("customers", {
          params: searchParams,
        })
        .then((res) => res.data),
    select: (data) => data,
    placeholderData: keepPreviousData,
  });

/**
 * 고객 구매 목록 조회 옵션
 */
export const customerPurchasesQueryOptions = ({ id }: Partial<Pick<Customer, "id">>) =>
  queryOptions<Purchase[], unknown, PurchaseWithId[]>({
    queryKey: ["customerPurchases", id],
    queryFn: () => apiInstance.get(`customers/${id}/purchases`).then((res) => res.data),
    select: (data) => data.map((purchase) => ({ ...purchase, id: nanoid() })),
    throwOnError: true,
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
