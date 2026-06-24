import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');

      const res = await API.get('/dashboard/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    };

    fetchStats();
  }, []);

  if (!stats) return <Loading />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome to CampusHub
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400">
            Total Assignments
          </h3>

          <p className="text-3xl font-bold mt-2">{stats.totalAssignments}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400">Completed</h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.completed}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400">Pending</h3>

          <p className="text-3xl font-bold text-red-600 mt-2">
            {stats.pending}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400">In Progress</h3>

          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {stats.inProgress}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400">Progress</h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.completionPercentage}%
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold mb-4">Assignment Progress</h3>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${stats.completionPercentage}%`,
            }}
          ></div>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {stats.completionPercentage}% Completed
        </p>
      </div>

      {(user.role === 'admin' || user.role === 'monitor') && (
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate('/add-note')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Add Note
          </button>

          <button
            onClick={() => navigate('/add-assignment')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Assignment
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
