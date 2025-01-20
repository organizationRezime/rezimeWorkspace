import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TimeProvider } from './contexts/TimeProvider.jsx'
import {EmployeeProvider} from './contexts/EmployeeProvider.jsx'
import { SidebarProvider } from './contexts/SidebarProvider.jsx'
import { TasksProvider } from './contexts/TasksProvider.jsx'
import { TeamProvider } from './contexts/TeamProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeeProvider>
    <TeamProvider>
    <TasksProvider>
    <TimeProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </TimeProvider>
    </TasksProvider>
    </TeamProvider>
    </EmployeeProvider>
  </StrictMode>,
)
