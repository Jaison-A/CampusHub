import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function AddNotes() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    semester: 7,
    department: 'cse',
  });
  const [pdf, setPdf] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('subject', formData.subject);
    uploadData.append('semester', formData.semester);
    uploadData.append('department', formData.department);
    if (pdf) {
      uploadData.append('pdf', pdf);
    }

    await API.post('/notes', uploadData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Note Created');
    navigate('/notes');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Add Note</h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Upload study materials for students
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>

            <input
              type="text"
              placeholder="Title of the Notes"
              className="w-full px-4 py-2 border rounded-lg
          dark:bg-gray-700 dark:border-gray-600
          focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={handleChange}
              name="title"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Subject</label>

            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 border rounded-lg
          dark:bg-gray-700 dark:border-gray-600
          focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={handleChange}
              name="subject"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Department</label>

            <select
              className="w-full px-4 py-2 border rounded-lg
  bg-white text-gray-900
  dark:bg-gray-700 dark:text-white dark:border-gray-600
  focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={handleChange}
              name="department"
            >
              <option>Select Department</option>
              <option value="cse">CSE</option>
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
              name="semester"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">PDF File</label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full px-4 h-15 py-2 border rounded-lg
  dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold shadow-md"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNotes;
