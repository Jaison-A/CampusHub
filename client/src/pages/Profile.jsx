import { useEffect, useState } from 'react';
import API from '../api/axios';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await API.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => navigate('/login'), 1000);
  };
  if (!user) return <Loading />;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3x-l mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-700">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-3xl text-white font-bold ">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl mt-4 font-bold capitalize">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{user.role}</p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Department</p>
              <p className="font-semibold uppercase">{user.department}</p>
            </div>
            <div>
              <p className="text-gray-500">Semester</p>
              <p className="font-semibold">{user.semester}</p>
            </div>

            <div>
              <p className="text-gray-500">Role</p>
              <p className="font-semibold capitalize">{user.role}</p>
            </div>
          </div>
          <div className="mt-8 flex gap-5">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Edit Profile
            </button>

            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="md:ml-25 bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
