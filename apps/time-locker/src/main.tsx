import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "time-locker-ui/dist/styles.css";
import "./index.css";
import App from "./app/index.tsx";
import { AuthProvider } from "./lib/auth/auth-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
