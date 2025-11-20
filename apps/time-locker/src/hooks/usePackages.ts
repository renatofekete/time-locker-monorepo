import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/restClient";

const getPackages = async (endpoint: string) => apiGet<any>(endpoint);

export const usePackages = (endpoint: string) => {
  return useQuery({
    queryKey: ["packages", endpoint],
    queryFn: () => getPackages(endpoint),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5000,
  });
};

export const usePackage = (endpoint: string) => {
  return useQuery({
    queryKey: ["package", endpoint],
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

export const usePackageStates = (endpoint: string) => {
  return useQuery({
    queryKey: ["packagesStates", endpoint],
    queryFn: () => getPackages(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePackagesPickupMethod = (endpoint: string) => {
  return useQuery({
    queryKey: ["packagesPickupMethod", endpoint],
    queryFn: () => getPackages(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};
