export type ApiResponse<T> = {
  data: T;
  statusCode: number;
  isSuccessful: boolean;
  message: string | null;
  timestamp: string;
};
