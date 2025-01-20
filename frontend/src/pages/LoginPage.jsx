import React, { useState, useEffect } from 'react';
import { ArrowRight, HelpCircle, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { loginEmployee, testApi } from '../services/apiServices';

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  // Redirect to dashboard if token is already available
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
        const res = await loginEmployee(employeeId, password);
        const data = res.data;
  
        if (res.status === 200 && data.token) {
            Cookies.set('token', data.token, { expires: 30 });
            window.location.href = '/dashboard';
        } else {
            setError(data.message || 'Login failed');
        }
    } catch (err) {
        if (err.response) {
            if (err.response.status === 400) {
                setError('Invalid employee ID or password.');
            } else if (err.response.status === 500) {
                setError('Server error. Please try again later.');
            } else {
                setError('An unexpected error occurred.');
            }
        } else {
            setError('Network error. Please check your connection.');
        }
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Rezime Workspace</h1>
          <p className="text-gray-400 text-sm">Access your workspace securely</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-200">
              Employee ID
            </label>
            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter your employee ID"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Go to Workspace
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <button
          onClick={() => setShowHelp(true)}
          className="w-full px-4 py-2 text-gray-400 hover:text-gray-300 flex items-center justify-center gap-2 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          Need Help?
        </button>

        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full space-y-4">
              <h2 className="text-xl font-semibold text-white">Need Assistance?</h2>
              <p className="text-gray-300">
                Please contact our IT team or your HR representative for login assistance:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>IT Support: support@rezime.in</li>
                <li>HR Department: hr@rezime.in</li>
                <li>Any Query: info@rezime.in </li>
              </ul>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
