import { useEffect, useState } from 'react';
import API from '../api/axios';
import Loading from '../components/Loading';

function MyProgress() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return storedUser.semester ? String(storedUser.semester) : 'all';
  });

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem('token');

      const res = await API.get('/submissions/my-progress', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubmissions(res.data);
      // console.log(res.data);
    };

    fetchProgress();
  }, []);
  if (!submissions) return <Loading />;

  const filteredSubmissions = submissions.filter((item) => {
    if (!item.assignment) return false;

    if (selectedSemester === 'all') return true;

    return String(item.assignment.semester) === selectedSemester;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold">My Progress</h1>

          <p className="text-gray-500 dark:text-gray-400">
            Track your assignment submissions
          </p>
        </div>

        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        >
          <option value="all">All Semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={String(sem)}>
              Semester {sem}
            </option>
          ))}
        </select>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md">
          <h2 className="text-xl font-semibold">No Progress Found</h2>
          <p className="text-gray-500 mt-2">
            There are no submissions for the selected semester.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSubmissions.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold">{item.assignment.title}</h3>
              <h3>
                CreatedAt :
                {new Date(item.createdAt).toLocaleDateString('en-GB')}
              </h3>
              {item.status.toLowerCase() === 'completed' && (
                <h3>
                  SubmittedOn:
                  {new Date(item.submittedAt).toLocaleDateString('en-GB')}
                </h3>
              )}
              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
              ${
                item.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
                >
                  {item.status === 'Completed' ? 'Completed' : 'Incomplete'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProgress;
