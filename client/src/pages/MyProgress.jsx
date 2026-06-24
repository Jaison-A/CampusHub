import { useEffect, useState } from 'react';
import API from '../api/axios';
import Loading from '../components/Loading';

function MyProgress() {
  const [submissions, setSubmissions] = useState([]);

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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Progress</h1>

        <p className="text-gray-500 dark:text-gray-400">
          Track your assignment submissions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {submissions
          .filter((item) => item.assignment)
          .map((item) => (
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
    </div>
  );
}

export default MyProgress;
