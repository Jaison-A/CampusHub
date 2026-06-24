import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pdf, setPdf] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    semester: '',
    department: '',
  });
  useEffect(() => {
    fetchNote();
  }, []);
  const fetchNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        title: res.data.title,
        subject: res.data.subject,
        semester: res.data.semester,
        department: res.data.department,
        fileUrl: res.data.fileUrl,
      });
    } catch (err) {
      console.log(err);
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
      const uploadData = new FormData();

      uploadData.append('title', formData.title);
      uploadData.append('subject', formData.subject);
      uploadData.append('semester', formData.semester);
      uploadData.append('department', formData.department);

      if (pdf) {
        uploadData.append('pdf', pdf);
      }

      await API.put(`/notes/${id}`, uploadData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Note Updated');

      navigate('/notes');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6">Edit Note</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter note title"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subject"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="cse,it,mech,ece,eee,civil"
              required
            />
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <input
              type="number"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Semester"
              required
            />
          </div>

          {/* File  */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Replace PDF (Optional)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2"
            />

            {formData.fileUrl && (
              <a
                href={formData.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm underline mt-2 block"
              >
                View Current PDF
              </a>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Update Note
            </button>

            <button
              type="button"
              onClick={() => navigate('/notes')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
