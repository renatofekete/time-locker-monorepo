import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch, apiDelete } from "@/lib/api/restClient";

const getCouriers = async (endpoint: string) => apiGet<any>(endpoint);
const editCouriers = async ({
  endpoint,
  data,
}: {
  endpoint: string;
  data: any;
}) => apiPatch<any>(endpoint, data);

const deleteCourier = async (endpoint: string) => apiDelete<any>(endpoint);

export const useCouriers = (endpoint: string) => {
  return useQuery({
    queryKey: ["couriers", endpoint],
    queryFn: () => getCouriers(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};

export const useEditCourier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ endpoint, data }: { endpoint: string; data: any }) =>
      apiPatch<any>(endpoint, data),
    onSuccess: (responseData, variables: any) => {
      // update single courier cache (if present)
      queryClient.setQueryData(["couriers", variables.endpoint], responseData);

      // invalidate any couriers list queries so lists refetch
      queryClient.invalidateQueries({ queryKey: ["couriers"] });
    },
  });
};

export const useDeleteCourier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (endpoint: string) => apiDelete<any>(endpoint),
    onSuccess: () => {
      // refresh couriers lists
      queryClient.invalidateQueries({ queryKey: ["couriers"] });
    },
  });
};
