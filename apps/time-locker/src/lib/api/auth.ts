import apiClient from "./client";

export async function login(email: string, password: string) {
  const response = await apiClient.post("/auth/login", { email, password });
  console.log("Login response:", response.data.data);
  return response.data.data; // { accessToken, refreshToken, user }
}

export async function refreshToken(refreshToken: string) {
  const response = await apiClient.post("/auth/refresh", { refreshToken });
  return response.data; // { accessToken }
}
