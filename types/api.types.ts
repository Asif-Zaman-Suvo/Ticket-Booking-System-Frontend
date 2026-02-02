export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequest<T = unknown> {
  endpoint: string;
  method?: ApiMethod;
  body?: T;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  count: number;
  timestamp: string;
}

export interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string; 
  url: string;
}
