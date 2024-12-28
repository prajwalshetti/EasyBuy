import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Search, RefreshCcw, ChevronUp, ChevronDown } from 'lucide-react';

function SeeUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/getAllUsers");
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedUsers = () => {
    if (!sortConfig.key) return users;

    return [...users].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredUsers = getSortedUsers().filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto mt-5">
      <div className="bg-gray-200 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gray-200 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button
                onClick={getAllUsers}
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-200 rounded-lg transition-colors"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : users.length > 0 ? (
            <table className="w-full">
              <thead className="bg-blue-100">
                <tr>
                  {[
                    { key: 'username', label: 'Username' },
                    { key: 'email', label: 'Email' },
                    { key: 'role', label: 'Role' }
                  ].map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-white"
                      onClick={() => handleSort(column.key)}
                    >
                      <div className="flex items-center gap-2">
                        {column.label}
                        <SortIcon column={column.key} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${user.role === 1 
                            ? 'bg-purple-200 text-purple-800' 
                            : 'bg-blue-200 text-blue-800'
                          }`}
                      >
                        {user.role === 1 ? 'Admin' : 'Customer'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No users available. Click the refresh button to fetch users.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-blue-100 border-t">
          <div className="text-sm text-gray-500 font-semibold">
            Total Users: {filteredUsers.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeUsers;