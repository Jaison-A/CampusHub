import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import Loading from '../components/Loading';

function ViewPdf() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await API.get(`/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNote(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNote();
  }, [id]);

  if (!note) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen">
      <iframe
        src={note.fileUrl}
        title="PDF Viewer"
        width="100%"
        height="95%"
        className="border"
      />
    </div>
  );
}

export default ViewPdf;
