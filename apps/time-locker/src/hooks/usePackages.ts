import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/restClient";

const getPackages = async (endpoint: string) => apiGet<any>(endpoint);

export const usePackages = (endpoint: string) => {
  return useQuery({
    queryKey: ["packages", endpoint],
    queryFn: () => getPackages(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePackagesStatistics = (endpoint: string) => {
  return useQuery({
    queryKey: ["packagesStatistics", endpoint],
    queryFn: () => getPackages(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};
