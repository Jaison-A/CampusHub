import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return storedUser.semester ? String(storedUser.semester) : 'all';
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const canManage = ['admin', 'teacher', 'monitor'].includes(user.role);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await API.get('/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(res.data || []);

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userSemester = storedUser.semester
          ? String(storedUser.semester)
          : '';

        if (userSemester && Array.isArray(res.data)) {
          const hasMatchingSemester = res.data.some(
            (note) => String(note.semester) === userSemester,
          );

          if (hasMatchingSemester) {
            setSelectedSemester(userSemester);
          } else {
            setSelectedSemester('all');
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, []);
  const deleteNote = async (note) => {
    const token = localStorage.getItem('token');

    await API.delete(`/notes/${note._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes((prev) => prev.filter((n) => n._id !== note._id));
  };
  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url);

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log(error);
    }
  };
  if (!notes) return <Loading />;

  const filteredNotes =
    selectedSemester === 'all'
      ? notes
      : notes.filter((note) => String(note.semester) === selectedSemester);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Browse and manage study materials
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
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
              onClick={() => navigate('/add-note')}
            >
              + Add Note
            </button>
          )}
        </div>
      </div>
      {filteredNotes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md">
          <h2 className="text-xl font-semibold">No Notes Found</h2>
          <p className="text-gray-500 mt-2">
            There are no notes available for the selected semester.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
              key={note._id}
            >
              <h3 className="mb-2 text-xl font-semibold">{note.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{note.subject}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {note.department.toUpperCase()}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Sem:{note.semester}
              </p>
              {/* pdf */}
              <div className="mt-3 flex gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/view-pdf/${note._id}`)}
                >
                  View PDF
                </button>
                <button
                  onClick={() =>
                    handleDownload(
                      note.fileUrl,
                      note.fileName || `${note.title}.pdf`,
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Download
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                {canManage && (
                  <>
                    <button
                      onClick={() => navigate(`/edit-note/${note._id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteNote(note)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded "
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;
