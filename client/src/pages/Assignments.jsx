import { useEffect, useState } from 'react';
import API from '../api/axios';
import AssignmentCard from '../components/AssignmentCard';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return storedUser.semester ? String(storedUser.semester) : 'all';
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const canManage = ['admin', 'teacher', 'monitor'].includes(user.role);
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token');

        const [assignmentsRes, submissionsRes] = await Promise.all([
          API.get('/assignments', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          API.get('/submissions/my-progress', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const statusMap = {};

        submissionsRes.data.forEach((submission) => {
          if (submission.assignment) {
            statusMap[submission.assignment._id] = submission.status;
          }
        });

        const assignmentsWithStatus = assignmentsRes.data.map((assignment) => ({
          ...assignment,
          status: statusMap[assignment._id] || 'Not Started',
        }));

        setAssignments(assignmentsWithStatus);

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userSemester = storedUser.semester
          ? String(storedUser.semester)
          : '';

        if (userSemester && Array.isArray(assignmentsWithStatus)) {
          const hasMatchingSemester = assignmentsWithStatus.some(
            (assignment) => String(assignment.semester) === userSemester,
          );

          if (hasMatchingSemester) {
            setSelectedSemester(userSemester);
          } else {
            setSelectedSemester('all');
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const deleteAssignment = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await API.delete(`/assignments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssignments((prev) =>
        prev.filter((assignment) => assignment._id !== id),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const filteredAssignments =
    selectedSemester === 'all'
      ? assignments
      : assignments.filter(
          (assignment) => String(assignment.semester) === selectedSemester,
        );

  if (loading) {
    return <h2>Loading...</h2>;
  }
  /* const updateStatus = async (assignmentId, status) => {
    try {
      const token = localStorage.getItem('token');

      await API.post(
        '/submissions/status',
        {
          assignmentId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success('Status Updated Successfully!');
    } catch (error) {
      console.log(error);
    }
  };
  */

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>

            <p className="text-gray-500 dark:text-gray-400">
              Manage and track your assignments
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
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
            {canManage && (
              <Link to="/add-assignment">
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md">
                  + Add Assignment
                </button>
              </Link>
            )}
          </div>
        </div>

        {filteredAssignments.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md">
            <h2 className="text-xl font-semibold">No Assignments Found</h2>

            <p className="text-gray-500 mt-2">
              There are currently no assignments available for the selected
              semester.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                deleteAssignment={deleteAssignment}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Assignments;
