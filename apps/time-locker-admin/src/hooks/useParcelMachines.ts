import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/restClient";

const getParcelMachines = async (endpoint: string) => apiGet<any>(endpoint);

export const useParcelMachines = (endpoint: string) => {
  return useQuery({
    queryKey: ["parcelMachines", endpoint],
    queryFn: () => getParcelMachines(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};
