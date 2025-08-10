import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Modal } from 'antd';
import { User, CreateUserRequest, UpdateUserRequest } from '../types/User';

const { Option } = Select;

interface UserFormProps {
  visible: boolean;
  user?: User;
  onSubmit: (userData: CreateUserRequest | UpdateUserRequest) => Promise<boolean>;
  onCancel: () => void;
  loading: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  visible,
  user,
  onSubmit,
  onCancel,
  loading
}) => {
  const [form] = Form.useForm();
  const isEditing = !!user;

  useEffect(() => {
    if (visible) {
      if (user) {
        form.setFieldsValue(user);
      } else {
        form.resetFields();
      }
    }
  }, [form, user, visible]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const success = await onSubmit(
        isEditing ? { ...values, id: user.id } : values
      );
      if (success) {
        form.resetFields();
        onCancel();
      }
    } catch (error) {
      // Form validation errors are handled by Ant Design
    }
  };

  return (
    <Modal
      title={isEditing ? 'Edit User' : 'Create New User'}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {isEditing ? 'Update' : 'Create'}
        </Button>
      ]}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: 'active',
          role: 'user'
        }}
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            { required: true, message: 'Please enter the user name' },
            { min: 2, message: 'Name must be at least 2 characters' }
          ]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter the email address' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please enter the phone number' },
            { pattern: /^\+?[\d\s\-\(\)]+$/, message: 'Please enter a valid phone number' }
          ]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select role">
            <Option value="admin">Administrator</Option>
            <Option value="manager">Manager</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Select placeholder="Select status">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};