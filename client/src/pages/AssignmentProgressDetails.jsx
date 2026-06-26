import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Loading from '../components/Loading';

function AssignmentProgressDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignmentProgress = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/submissions/progress/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEntry(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentProgress();
  }, [id]);

  if (loading) return <Loading />;

  if (!entry) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold">No progress found</h2>
        <p className="mt-2 text-gray-500">
          This assignment does not have any progress data yet.
        </p>
        <button
          onClick={() => navigate('/class-progress')}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Back to class progress
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">{entry.assignmentTitle}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {entry.assignmentSubject}
          </p>
        </div>
        <button
          onClick={() => navigate('/class-progress')}
          className="rounded-lg bg-gray-700 px-4 py-2 text-white"
        >
          Back
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/40 dark:text-green-200">
          ✅ Completed: {entry.counts.Completed}
        </span>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200">
          ⏳ In Progress: {entry.counts['In Progress']}
        </span>
        <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
          ⚪ Not Started: {entry.counts['Not Started']}
        </span>
      </div>

      <div className="grid gap-4">
        {entry.students.map((student) => (
          <div
            key={student.studentId || student.name}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {student.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignmentProgressDetails;
