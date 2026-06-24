import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 ">
        {children}
      </main>
    </div>
  );
}

export default Layout;
