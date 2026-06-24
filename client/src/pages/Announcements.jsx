import { useEffect, useState } from 'react';
import API from '../api/axios';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const token = localStorage.getItem('token');

    const res = await API.get('/announcements', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAnnouncements(res.data);
  };

  return (
    <div>
      <h1>Announcements</h1>

      {announcements.map((announcement) => (
        <div key={announcement._id}>
          <h3>{announcement.title}</h3>

          <p>{announcement.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Announcements;
