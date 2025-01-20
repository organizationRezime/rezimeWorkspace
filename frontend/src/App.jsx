import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';
import AppLayout from './layout/AppLayout';
import TasksPage from './pages/TasksPage/TaskPage';
import AssignTask from './pages/TasksPage/AssignTask';
import AssignedTasks from './pages/TasksPage/AssignedTasks';
import TeamManagement from './pages/TeamPage';
import RegisterEmployee from './pages/RegisterEmployee';
import AccessDeclinePage from './pages/AccessDeclinePage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>,
      children:[
        {
          path: "/",
          element: <Navigate to="/dashboard"/>,
          errorElement: <ErrorPage />
        },
        {
          path: "/dashboard",
          element: <PrivateRoute element={<DashboardPage />} />,
          errorElement: <ErrorPage />

        },
        {
          path: "/profile",
          element: <PrivateRoute element={<ProfilePage />} />,
          errorElement: <ErrorPage />
        },
        {
          path: "/tasks",
          element: <PrivateRoute element={<TasksPage />} />,
          errorElement: <ErrorPage />
        },
        {
          path: "/help",
          element: <PrivateRoute element={<HelpPage />} />,
          errorElement: <ErrorPage />
        },
        {
          path: "/tasks/assign",
          element: <AssignTask/>,
          errorElement: <ErrorPage />
        },
        {
          path: "/tasks/assignedTasks",
          element: <AssignedTasks/>,
          errorElement: <ErrorPage />
        },
        {
          path: "/team",
          element: <PrivateRoute element={<TeamManagement />} />,
          errorElement: <ErrorPage />
        },
        {
          path: "/team/register",
          element:  <PrivateRoute element={<RegisterEmployee/>} />,
          errorElement: <ErrorPage/>
        },
        {
          path: "/email",
          element:   <PrivateRoute element={<AccessDeclinePage/>} />,
          errorElement: <ErrorPage/>
        }

      ]
    },
    {
      path: "login",
      element: <LoginPage />,
      errorElement: <ErrorPage />
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;