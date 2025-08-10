import { User, CreateUserRequest, UpdateUserRequest, UserFilters } from '../types/User';

// Mock data
let mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 234-5678',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 345-6789',
    role: 'manager',
    status: 'inactive',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 456-7890',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 567-8901',
    role: 'manager',
    status: 'active',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get API delay from environment variables
const getApiDelay = () => parseInt(import.meta.env.VITE_API_DELAY || '1000');

export const userApi = {
  // Get all users with optional filters
  async getUsers(filters?: UserFilters): Promise<User[]> {
    await delay(getApiDelay());
    
    let filteredUsers = [...mockUsers];
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.includes(searchLower)
      );
    }
    
    if (filters?.role) {
      filteredUsers = filteredUsers.filter(user => user.role === filters.role);
    }
    
    if (filters?.status) {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }
    
    return filteredUsers;
  },

  // Get user by ID
  async getUserById(id: number): Promise<User | null> {
    await delay(getApiDelay());
    return mockUsers.find(user => user.id === id) || null;
  },

  // Create new user
  async createUser(userData: CreateUserRequest): Promise<User> {
    await delay(getApiDelay());
    
    const newUser: User = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    return newUser;
  },

  // Update existing user
  async updateUser(userData: UpdateUserRequest): Promise<User> {
    await delay(getApiDelay());
    
    const index = mockUsers.findIndex(user => user.id === userData.id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser: User = {
      ...mockUsers[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    mockUsers[index] = updatedUser;
    return updatedUser;
  },

  // Delete user
  async deleteUser(id: number): Promise<boolean> {
    await delay(getApiDelay());
    
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    mockUsers.splice(index, 1);
    return true;
  }
};