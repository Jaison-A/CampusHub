import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function AssignmentCard({ assignment, deleteAssignment }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(assignment.status);
  const user = JSON.parse(localStorage.getItem('user'));
  const canManage = ['admin', 'teacher', 'monitor'].includes(user.role);
  const updateStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');

      await API.post(
        '/submissions/status',
        {
          assignmentId: assignment._id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStatus(newStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
  bg-white dark:bg-gray-800
  p-6
  rounded-2xl
  shadow-md
  border border-gray-200 dark:border-gray-700
  hover:shadow-xl
  transition-all duration-300
  "
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {assignment.title}
          </h3>

          <span
            className="
        inline-block
        mt-2
        px-3 py-1
        text-sm
        bg-blue-100 text-blue-700
        dark:bg-blue-900 dark:text-blue-200
        rounded-full
        "
          >
            {assignment.subject}
          </span>
        </div>

        <span
          className="
      px-3 py-1
      text-sm
      bg-gray-100 dark:bg-gray-700
      rounded-full
      font-medium
      "
        >
          📅 Due: {new Date(assignment.dueDate).toLocaleDateString('en-GB')}
        </span>
      </div>

      {/* Description */}
      <div className="mt-5">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {assignment.description}
        </p>
      </div>
      {/* semester */}
      <div className="mt-5">
        <span className="text-xs">Semester:</span>
        <span className="ml-2 text-xs">{assignment.semester}</span>
        <span className="ml-4 text-xs">Department:</span>
        <span className="ml-2 text-xs">{assignment.department}</span>
      </div>

      {/* Status */}
      <div className="mt-5 flex items-center gap-3">
        <span className="font-medium">Status:</span>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold
      ${
        status === 'Completed'
          ? 'bg-green-100 text-green-700'
          : status === 'In Progress'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700'
      }`}
        >
          {status}
        </span>
      </div>

      {/* Status Buttons */}
      {status !== 'Completed' && (
        <div className="mt-6 flex flex-wrap gap-2 ">
          <button
            className="
        bg-gray-600 hover:bg-gray-700
        text-white
        px-4 py-2
      rounded-lg
      transition
      "
            onClick={() => updateStatus('Not Started')}
          >
            Not Started
          </button>

          <button
            className="
      bg-yellow-500 hover:bg-yellow-600
      text-white
      px-4 py-2
      rounded-lg
      transition
      "
            onClick={() => updateStatus('In Progress')}
          >
            In Progress
          </button>

          <button
            className="
      bg-green-600 hover:bg-green-700
      text-white
      px-4 py-2
      rounded-lg
      transition
      "
            onClick={() => updateStatus('Completed')}
          >
            Completed
          </button>
        </div>
      )}

      {/* Admin Controls */}
      {canManage && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
          <button
            className="
        bg-yellow-600 hover:bg-yellow-500
        text-white
        px-4 py-2
        rounded-lg
        transition font-semibold
        "
            onClick={() => navigate(`/edit-assignment/${assignment._id}`)}
          >
            ✏️ Edit
          </button>

          <button
            className="
        bg-red-600 hover:bg-red-700
        text-white
        px-4 py-2
        rounded-lg
        transition font-semibold
        "
            onClick={() => deleteAssignment(assignment._id)}
          >
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default AssignmentCard;
