import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const canViewClassProgress = ['student', 'monitor'].includes(user?.role);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => navigate('/login'), 1000);
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/notes', label: 'Notes' },
    { to: '/assignments', label: 'Assignments' },
    { to: '/progress', label: 'My Progress' },
    ...(canViewClassProgress
      ? [{ to: '/class-progress', label: 'Class Progress' }]
      : []),
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        className="fixed left-4 top-4 z-50 rounded-lg border border-gray-300 bg-white p-2 text-gray-800 shadow-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition md:hidden ${
          isOpen ? 'visible' : 'invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gray-800 p-5 text-white shadow-xl transition-transform duration-300 md:sticky md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-500">CampusHub</h2>
          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  className="block rounded-md border border-gray-700 p-2 hover:bg-gray-700"
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-10 rounded-lg bg-red-800 px-4 py-2 text-white hover:bg-red-900"
        >
          Log Out
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
