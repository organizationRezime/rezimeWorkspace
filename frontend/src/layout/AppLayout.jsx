import React from 'react'
import Sidebar from '../components/organisms/SideBar'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className="flex gap-1 w-full h-full">
        <Sidebar/>

        <Outlet/>
    </div>
)
}

export default AppLayout