import { useState, useEffect, useCallback } from 'react';
import { User, CreateUserRequest, UpdateUserRequest, UserFilters } from '../types/User';
import { userApi } from '../services/userApi';
import { message } from 'antd';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users with optional filters
  const fetchUsers = useCallback(async (filters?: UserFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedUsers = await userApi.getUsers(filters);
      setUsers(fetchedUsers);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new user
  const createUser = useCallback(async (userData: CreateUserRequest): Promise<boolean> => {
    setLoading(true);
    
    try {
      const newUser = await userApi.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      message.success('User created successfully');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      message.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update existing user
  const updateUser = useCallback(async (userData: UpdateUserRequest): Promise<boolean> => {
    setLoading(true);
    
    try {
      const updatedUser = await userApi.updateUser(userData);
      setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
      message.success('User updated successfully');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      message.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete user
  const deleteUser = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    
    try {
      await userApi.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      message.success('User deleted successfully');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      message.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
};