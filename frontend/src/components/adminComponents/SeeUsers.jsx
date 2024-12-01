import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SeeUsers() {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/getAllUsers"); // Correct URL
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>

      <div>
        {users&&users.length > 0 ? (
          <ul>
                <li className="p-2 border-b flex justify-around border border-black">
                  <div className='min-w-28 font-semibold mr-1'>Username</div>
                  <div className='min-w-28 font-semibold ml-2'>Email</div>
                  <div className='min-w-28 font-semibold ml-5'>Role</div>
                </li>
            {users.map((user, index) => (
              <li key={index} className="p-2 border-b flex justify-around">
                <div className='min-w-28'>{user.username}</div>
                <div className='min-w-28'>{user.email}</div>
                <div className='min-w-28'>{user.role===1?"Admin":"Customer"}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users available. Click the button to fetch users.</p>
        )}
      </div>
    </div>
  );
}

export default SeeUsers;