import axios from "axios";
import { auth } from "@/lib/auth/firebaseConfig";

const API_BASE = "/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const accessToken = await user.getIdToken();

    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

export default apiClient;
