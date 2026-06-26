import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Loading from '../components/Loading';

function ClassProgress() {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await API.get('/submissions/progress', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProgressData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Class Assignment Progress</h1>
        <p className="text-gray-500 dark:text-gray-400">
          View the overall submission status for each assignment.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {progressData.map((entry) => (
          <div
            key={entry.assignmentId}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {entry.assignmentTitle}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {entry.assignmentSubject}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/40 dark:text-green-200">
                  ✅ Completed: {entry.counts.Completed}
                </span>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200">
                  ⏳ In Progress: {entry.counts['In Progress']}
                </span>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  ⚪ Not Started: {entry.counts['Not Started']}
                </span>
                <button
                  onClick={() =>
                    navigate(`/class-progress/${entry.assignmentId}`)
                  }
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                >
                  View
                </button>
              </div>
            </div>

            {entry.students.length > 0 ? (
              <div className="mt-5 space-y-2">
                {entry.students.map((student) => (
                  <div
                    key={student.studentId || student.name}
                    className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900/60 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {student.name}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {student.role || 'student'}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 md:items-end">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          student.status === 'Completed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200'
                            : student.status === 'In Progress'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200'
                              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {student.status || 'Not Started'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {student.submittedAt
                          ? `Submitted: ${new Date(student.submittedAt).toLocaleDateString('en-GB')}`
                          : 'Pending submission'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                No student submissions recorded yet.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassProgress;
