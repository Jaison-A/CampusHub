import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-5 sticky top-0">
      <h2 className="text-2xl text-red-500 font-bold mb-8">CampusHub</h2>

      <nav>
        <ul className="space-y-3">
          <li>
            <Link
              className="block p-2 rounded-md hover:bg-gray-700 border border-gray-700"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              className="block p-2 rounded-md hover:bg-gray-700 border border-gray-700"
              to="/notes"
            >
              Notes
            </Link>
          </li>

          <li>
            <Link
              className="block p-2 rounded-md hover:bg-gray-700 border border-gray-700"
              to="/assignments"
            >
              Assignments
            </Link>
          </li>

          <li>
            <Link
              className="hover:bg-gray-700 p-2 block rounded-md border border-gray-700"
              to="/progress"
            >
              My Progress
            </Link>
          </li>

          <li>
            <Link
              className="p-2 rounded-md block hover:bg-gray-700 border border-gray-700"
              to="/profile"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className=" absolute bottom-10  bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg"
      >
        Log Out
      </button>
    </aside>
  );
}

export default Sidebar;
