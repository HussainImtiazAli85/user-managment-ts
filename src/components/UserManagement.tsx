import React, { useState, useCallback } from 'react';
import { Card, Button, Space, Typography, Statistic, Row, Col } from 'antd';
import { PlusOutlined, UserOutlined, TeamOutlined, CrownOutlined } from '@ant-design/icons';
import { UserList } from './UserList';
import { UserForm } from './UserForm';
import { UserFiltersComponent } from './UserFilters';
import { useUsers } from '../hooks/useUsers';
import { User, UserFilters } from '../types/User';

const { Title } = Typography;

export const UserManagement: React.FC = () => {
  const { users, loading, createUser, updateUser, deleteUser, fetchUsers } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [filters, setFilters] = useState<UserFilters>({});

  // Apply filters when they change
  React.useEffect(() => {
    fetchUsers(filters);
  }, [filters, fetchUsers]);

  const handleCreateUser = useCallback(() => {
    setEditingUser(undefined);
    setShowForm(true);
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
    setShowForm(true);
  }, []);

  const handleFormSubmit = useCallback(async (userData: any) => {
    if (editingUser) {
      return await updateUser(userData);
    } else {
      return await createUser(userData);
    }
  }, [editingUser, createUser, updateUser]);

  const handleFormCancel = useCallback(() => {
    setShowForm(false);
    setEditingUser(undefined);
  }, []);

  const handleDeleteUser = useCallback(async (id: number) => {
    await deleteUser(id);
  }, [deleteUser]);

  const handleFiltersChange = useCallback((newFilters: UserFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const adminUsers = users.filter(user => user.role === 'admin').length;

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={2} style={{ margin: 0 }}>
              User Management
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateUser}
              size="large"
            >
              Add New User
            </Button>
          </div>

          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Users"
                  value={totalUsers}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Active Users"
                  value={activeUsers}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Administrators"
                  value={adminUsers}
                  prefix={<CrownOutlined />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
          </Row>

          <UserFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <UserList
          users={users}
          loading={loading}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        <UserForm
          visible={showForm}
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={loading}
        />
      </Card>
    </div>
  );
};