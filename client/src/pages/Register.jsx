import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();

  const [rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [department, setDepartment] = useState('cse');
  const [semester, setSemester] = useState('7');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', {
        name,
        rollno,
        password,
        semester,
        department,
        role,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success('Registration Successful!');

      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registeration Failed');
    }
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-red-600">CampusHub</h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create your account and start your journey
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Roll Number
              </label>

              <input
                type="text"
                placeholder="Enter your roll number"
                onChange={(e) => setRollno(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 hover:border-gray-400 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-red-500
          transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>

              <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 hover:border-gray-400 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-red-500
          transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 hover:border-gray-400 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-red-500
          transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>

              <input
                type="text"
                placeholder="cse,it, ece,eee,mech,civil"
                onChange={(e) => setDepartment(e.target.value)}
                defaultValue="cse"
                className="w-full px-4 py-2 border border-gray-300 hover:border-gray-400  dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-red-500
          transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Semester</label>

              <input
                type="number"
                placeholder="1"
                defaultValue={7}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 
              hover:border-gray-400 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-red-500
          transition duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Role</label>
              <select
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 hover:border-gray-400 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800
          
          transition duration-200"
              >
                <option value="student">Student</option>
                <option value="monitor">Monitor</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Register
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-5">
            All details are required. Your information is kept secure.
          </p>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have a member to CampusHub?
            </p>

            <button
              onClick={() => navigate('/login')}
              className="mt-2 text-red-600 hover:text-red-700 font-medium "
            >
              Login your Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
