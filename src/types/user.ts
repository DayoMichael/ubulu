export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
}

export interface FetchUsersParams {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: keyof User;
  sortOrder?: "asc" | "desc";
}

export interface FetchUsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
