import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const ManageUsers = () => {
  // 🔧 EDIT THIS: Replace with actual API call
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Dela Cruz', role: 'cashier', email: 'juan@company.com', status: 'active' },
    { id: 2, name: 'Maria Santos', role: 'supervisor', email: 'maria@company.com', status: 'active' },
    { id: 3, name: 'Pedro Reyes', role: 'stock_clerk', email: 'pedro@company.com', status: 'inactive' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'cashier',
    jobTitle: '',
    contactNumber: ''
  });

  // 🔧 EDIT THIS: Replace with actual API call
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      // await api.put(`/users/${userId}/status`, { status: currentStatus === 'active' ? 'inactive' : 'active' });
      setUsers(users.map(u => 
        u.id === userId ? { ...u, status: currentStatus === 'active' ? 'inactive' : 'active' } : u
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  // 🔧 EDIT THIS: Replace with actual API call
  const addUser = async () => {
    try {
      // const response = await api.post('/users', newUser);
      console.log('Adding user:', newUser);
      setShowAddModal(false);
      // Refresh user list
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      cashier: 'bg-blue-100 text-blue-800',
      supervisor: 'bg-orange-100 text-orange-800',
      manager: 'bg-purple-100 text-purple-800',
      hr: 'bg-green-100 text-green-800',
      stock_clerk: 'bg-yellow-100 text-yellow-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <Button onClick={() => setShowAddModal(true)}>Add New User</Button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleUserStatus(user.id, user.status)}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add New User</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="cashier">Cashier</option>
                <option value="sales_associate">Sales Associate</option>
                <option value="stock_clerk">Stock Clerk</option>
                <option value="supervisor">Shift Supervisor</option>
                <option value="manager">Store Manager</option>
                <option value="hr">HR Admin</option>
              </select>
              
              <input
                type="text"
                placeholder="Job Title"
                value={newUser.jobTitle}
                onChange={(e) => setNewUser({...newUser, jobTitle: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              
              <input
                type="tel"
                placeholder="Contact Number"
                value={newUser.contactNumber}
                onChange={(e) => setNewUser({...newUser, contactNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={addUser}>
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ManageUsers;
