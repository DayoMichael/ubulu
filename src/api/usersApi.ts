import type { FetchUsersParams, FetchUsersResponse } from "../types/user";

export async function fetchUsers({
  limit = 10,
  skip = 0,
  search = "",
}: FetchUsersParams = {}): Promise<FetchUsersResponse> {
  const params = new URLSearchParams();
  params.append("limit", String(limit));
  params.append("skip", String(skip));
  if (search) params.append("q", search);

  const url = search
    ? `https://dummyjson.com/users/search?${params.toString()}`
    : `https://dummyjson.com/users?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data;
}
