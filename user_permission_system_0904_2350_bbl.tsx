// 代码生成时间: 2025-09-04 23:50:34
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the interface for User and Role
interface User {
  id: number;
  username: string;
  roles: string[];
}

interface Role {
  id: number;
  name: string;
}

// State management for users and roles
const PermissionManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch users and roles from an API
  useEffect(() => {
    Promise.all([
      axios.get<User[]>('/api/users'),
      axios.get<Role[]>('/api/roles')
    ]).then(([usersResponse, rolesResponse]) => {
      setUsers(usersResponse.data);
      setRoles(rolesResponse.data);
    }).catch(err => {
      setError('Failed to fetch users and roles');
      console.error(err);
    });
  }, []);

  const handleUserChange = (userId: number) => {
    // Find and select a user based on ID
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setSelectedRole(null); // Reset role selection when user changes
    }
  };

  const handleRoleChange = (roleId: number) => {
    // Find and select a role based on ID
    const role = roles.find(r => r.id === roleId);
    if (role) {
      setSelectedRole(role);
    }
  };

  const assignRoleToUser = () => {
    if (selectedUser && selectedRole) {
      axios.post('/api/assign-role', { userId: selectedUser.id, roleId: selectedRole.id })
        .then(() => {
          alert(`Role '${selectedRole.name}' assigned to user '${selectedUser.username}'`);
          // Refetch users to update their roles
          setUsers((prevUsers) => {
            const updatedUser = prevUsers.find(u => u.id === selectedUser.id) || selectedUser;
            updatedUser.roles.push(selectedRole.name);
            return [...prevUsers];
          });
        })
        .catch(err => {
          setError('Failed to assign role to user');
          console.error(err);
        });
    } else {
      setError('Please select both a user and a role');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>User Permission Management System</h1>
      <div>
        <label htmlFor='user-select'>Select User:</label>
        <select id='user-select' onChange={(e) => handleUserChange(Number(e.target.value))} value={selectedUser?.id || ''}>
          <option value=''>Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='role-select'>Select Role:</label>
        <select id='role-select' onChange={(e) => handleRoleChange(Number(e.target.value))} value={selectedRole?.id || ''}>
          <option value=''>Select Role</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>
      <button onClick={assignRoleToUser}>Assign Role</button>
    </div>
  );
};

export default PermissionManager;