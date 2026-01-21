export interface ApiError {
  error: string;
  timestamp: string;
  message: string;
  status: number;
  path: string;
  details?: Record<string, unknown>[];
}
