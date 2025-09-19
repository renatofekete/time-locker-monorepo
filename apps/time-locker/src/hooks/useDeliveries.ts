import { useQuery } from "@tanstack/react-query";
import type { FetchDeliveriesType } from "@/types/DeliveryType";
import { apiGet } from "@/lib/api/restClient";

const getDeliveries = async (endpoint: string) =>
  apiGet<FetchDeliveriesType>(endpoint);

export const useDeliveries = (endpoint: string) => {
  return useQuery({
    queryKey: ["deliveries", endpoint],
    queryFn: () => getDeliveries(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};
