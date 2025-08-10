import React from 'react';
import { Input, Select, Row, Col, Button } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { UserFilters } from '../types/User';

const { Option } = Select;

interface UserFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
  onClearFilters: () => void;
}

export const UserFiltersComponent: React.FC<UserFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleRoleChange = (value: string) => {
    onFiltersChange({ ...filters, role: value || undefined });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value || undefined });
  };

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col xs={24} sm={8}>
        <Input
          placeholder="Search by name, email, or phone"
          prefix={<SearchOutlined />}
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          allowClear
        />
      </Col>
      <Col xs={24} sm={6}>
        <Select
          placeholder="Filter by role"
          value={filters.role}
          onChange={handleRoleChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="admin">Administrator</Option>
          <Option value="manager">Manager</Option>
          <Option value="user">User</Option>
        </Select>
      </Col>
      <Col xs={24} sm={6}>
        <Select
          placeholder="Filter by status"
          value={filters.status}
          onChange={handleStatusChange}
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Col>
      <Col xs={24} sm={4}>
        <Button
          icon={<ClearOutlined />}
          onClick={onClearFilters}
          style={{ width: '100%' }}
        >
          Clear
        </Button>
      </Col>
    </Row>
  );
};