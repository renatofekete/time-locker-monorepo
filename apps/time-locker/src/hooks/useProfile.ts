import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth/auth-provider";
import { apiGet } from "@/lib/api/restClient";
import type { UserType } from "@/types/UserType";

type LoginType = {
  email: string;
  password: string;
};

export function useLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: ({ email, password }: LoginType) => login(email, password),
  });
}

const getUser = async (endpoint: string) => apiGet<UserType>(endpoint);

export const useUser = (endpoint: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};
