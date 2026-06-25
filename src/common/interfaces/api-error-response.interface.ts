export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
  timestamp: string;
  path: string;
}
