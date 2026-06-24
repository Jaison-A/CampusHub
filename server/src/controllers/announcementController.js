import Announcement from '../models/Announcement.js';

export const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      department: req.user.department,
      semester: req.user.semester,
    });

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
