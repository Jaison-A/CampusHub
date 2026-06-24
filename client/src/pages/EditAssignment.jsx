import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

function EditAssignment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    semester: '',
    department: '',
    dueDate: '',
  });

  useEffect(() => {
    fetchAssignment();
  }, []);

  const fetchAssignment = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await API.get(`/assignments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        title: res.data.title,
        subject: res.data.subject,
        description: res.data.description,
        semester: res.data.semester,
        department: res.data.department,

        dueDate: res.data.dueDate?.split('T')[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

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

      await API.put(`/assignments/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Assignment Updated');

      navigate('/assignments');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Assignment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-3 rounded  focus:ring-2
        focus:ring-red-500 focus:outline-none 
        hover:border-red-500 "
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          className="w-full border p-3 rounded  focus:ring-2
        focus:ring-red-500 focus:outline-none 
        hover:border-red-500"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
        />
        <textarea
          className="w-full border p-3 rounded  resize-none focus:ring-2
        focus:ring-red-500 focus:outline-none 
        hover:border-red-500"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          className="w-full border p-3 rounded  focus:ring-2
        focus:ring-red-500 focus:outline-none 
        hover:border-red-500"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          placeholder="Semester"
        />
        <input
          className="w-full border p-3 rounded  focus:ring-2
        focus:ring-red-500 focus:outline-none 
        hover:border-red-500"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full border p-3 rounded 
        
          text-gray-900
        
          dark:text-white
          dark:border-gray-600
         focus:ring-2
        focus:ring-red-500 focus:outline-none 
        hover:border-red-500 "
        />
        {/* Buttons */}
        <div className="flex gap-3 pt-4 mb-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Update Assignment
          </button>

          <button
            type="button"
            onClick={() => navigate('/assignments')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAssignment;
