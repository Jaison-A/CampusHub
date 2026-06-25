import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddAssignment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    department: 'cse',
    semester: 7,
    dueDate: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await API.post('/assignments', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Assignment Created Successfully!');
      setTimeout(() => navigate('/assignments'), 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to create assignment');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Add Assignment</h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Create and assign tasks for students
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Title</label>

            <input
              name="title"
              placeholder="Assignment Title"
              onChange={handleChange}
              className="
          w-full
          px-4
          py-2
          border
          rounded-lg
          bg-white
          text-gray-900
          dark:bg-gray-700
          dark:text-white
          dark:border-gray-600
          focus:ring-2
          focus:ring-red-500
          focus:outline-none
          "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Subject</label>

            <input
              name="subject"
              placeholder="Subject"
              onChange={handleChange}
              className="
          w-full
          px-4
          py-2
          border
          rounded-lg
          bg-white
          text-gray-900
          dark:bg-gray-700
          dark:text-white
          dark:border-gray-600
          focus:ring-2
          focus:ring-red-500
          focus:outline-none
          "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Department</label>

            <select
              name="department"
              onChange={handleChange}
              className="
          w-full
          px-4
          py-2
          border
          rounded-lg
          bg-white
          text-gray-900
          dark:bg-gray-700
          dark:text-white
          dark:border-gray-600
          focus:ring-2
          focus:ring-red-500
          focus:outline-none
          "
            >
              <option>Select Department</option>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="ece">ECE</option>
              <option value="eee">EEE</option>
              <option value="mech">MECH</option>
              <option value="civil">CIVIL</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Semester</label>

            <input
              type="number"
              placeholder="Semester"
              defaultValue={7}
              className="w-full px-4 py-2 border rounded-lg
          dark:bg-gray-700 dark:border-gray-600
          focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Due Date</label>

            <input
              type="date"
              name="dueDate"
              onChange={handleChange}
              className="
          w-full
          px-4
          py-2
          border
          rounded-lg
          bg-white
          text-gray-900
          dark:bg-gray-700
          dark:text-white
          dark:border-gray-600
          focus:ring-2
          focus:ring-red-500
          focus:outline-none
          "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>

            <textarea
              name="description"
              rows="5"
              placeholder="Enter assignment details..."
              onChange={handleChange}
              className="
          w-full
          px-4
          py-2
          border
          rounded-lg
          bg-white
          text-gray-900
          dark:bg-gray-700
          dark:text-white
          dark:border-gray-600
          focus:ring-2
          focus:ring-red-500
          focus:outline-none
          resize-none
          "
            />
          </div>

          <button
            type="submit"
            className="
        w-full
        bg-red-600
        hover:bg-red-700
        active:scale-95
        transition-all
        duration-200
        text-white
        font-semibold
        py-3
        rounded-lg
        shadow-md
        hover:shadow-xl
        "
          >
            Create Assignment
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default AddAssignment;
