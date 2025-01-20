import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = Cookies.get('token');

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;