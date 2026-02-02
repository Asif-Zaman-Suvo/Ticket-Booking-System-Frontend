import { ApiRequest } from "@/types/api.types";

async function allDistrictApi<TResponse>({
  endpoint,
  method = "GET",
}: ApiRequest): Promise<TResponse> {
  const res = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<TResponse>;
}

export default allDistrictApi;
