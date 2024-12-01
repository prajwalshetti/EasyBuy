import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from './AdminNavBar.jsx'

function AdminDashboard() {
  return (
    <div>
      <AdminNavBar/>
      <div className="dashboard-content">
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  )
}

export default AdminDashboard