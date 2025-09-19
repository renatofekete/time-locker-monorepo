import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/restClient";

const getCouriers = async (endpoint: string) => apiGet<any>(endpoint);

export const useCouriers = (endpoint: string) => {
  return useQuery({
    queryKey: ["couriers", endpoint],
    queryFn: () => getCouriers(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};
