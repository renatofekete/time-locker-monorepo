import apiClient from "@/lib/api/client";

export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  const res = await apiClient.get<T>(endpoint, { params });
  return res.data;
}

export async function apiPost<T, B = unknown>(
  endpoint: string,
  body: B
): Promise<T> {
  const res = await apiClient.post<T>(endpoint, body);
  return res.data;
}

export async function apiPatch<T, B = unknown>(
  endpoint: string,
  body: B
): Promise<T> {
  const res = await apiClient.patch<T>(endpoint, body);
  return res.data;
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  const res = await apiClient.delete<T>(endpoint);
  return res.data;
}
