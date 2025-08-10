export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive';
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number;
}

export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
}