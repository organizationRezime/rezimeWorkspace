import React from 'react'
import { User, Briefcase, Calendar, Mail, Phone, MapPin, Edit, UserCircle } from 'lucide-react'

import { useSidebar } from '../contexts/SidebarProvider'
import ProfileLoading from '../components/loadings/ProfileLoading';
import GlobalError from '../components/Errors/GlobalError';
import { useEmployee } from '../contexts/EmployeeProvider';

export default function ProfilePage() {
  const { isCollapsed } = useSidebar();
  const {employee, employeeLoading, employeeError} = useEmployee();
  const {fullname, employeeId, email, address, createdAt, position, number, manager} = employee || {};

  const managerData = {
    employeeId: manager,
    email: `${manager?.toLowerCase()}@rezime.in`
  }

  if(employeeLoading){
    return <ProfileLoading/>
  }

  if (employeeError) return <GlobalError/>


  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 ${
        isCollapsed ? "md:px-8" : "md:px-4 md:pl-64 md:pr-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Employee Profile</h1>

        <div className="bg-[#1e2536] rounded-lg p-8 shadow-lg relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-repeat" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start mb-8">
              <div className="flex-grow">
                <h2 className="text-3xl font-semibold mb-2">{fullname}</h2>
                <p className="text-xl text-[#8b95a9] mb-4">{position}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <InfoItem icon={User} label="Employee ID" value={employeeId} />
                <InfoItem icon={Briefcase} label="Position" value={position} />
                <InfoItem icon={Calendar} label="Joining Date" value={new Date(createdAt)?.toLocaleDateString() } />
              </div>
              <div className="space-y-6">
                <InfoItem icon={Mail} label="Email" value={email} />
                <InfoItem icon={Phone} label="Number" value={number} />
                <InfoItem icon={MapPin} label="Address" value={address} />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#2a3241]">
              <h3 className="text-xl font-semibold mb-4">Your Manager Contact Information</h3>
              <div className="space-y-4">
                <InfoItem icon={UserCircle} label="Manager Employee ID" value={managerData.employeeId} />
                <InfoItem icon={Mail} label="Manager Email" value={managerData.email} />
              </div>
              <p className="text-[#5d6b89] text-sm mt-6">
                To update your personal information, please email the your manager using the details above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center space-x-4 group">
      <div className="w-10 h-10 rounded-full bg-[#2a3241] flex items-center justify-center group-hover:bg-[#323b4e] transition-colors duration-300">
        <Icon size={20} className="text-[#8b95a9]" />
      </div>
      <div>
        <p className="text-[#8b95a9] text-sm">{label}</p>
        <p className="text-white font-medium">{value  || "Contact HR to update"}</p>
      </div>
    </div>
  )
}