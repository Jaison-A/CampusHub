import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);

      localStorage.setItem('user', JSON.stringify(res.data.user));

      const user = JSON.parse(localStorage.getItem('user'));

      console.log(user.role);
      alert('Login Successful');

      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-red-600">CampusHub</h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Login to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-400 transition-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-400 transition-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            New to CampusHub?
          </p>

          <button
            onClick={() => navigate('/register')}
            className="mt-2 text-red-600 hover:text-red-700 font-medium "
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
