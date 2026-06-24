import Note from '../models/Note.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const createNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'PDF required',
      });
    }
    const uploadPromise = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'campushub',
            resource_type: 'auto',
            type: 'upload',
            public_id: `${Date.now()}-${req.file.originalname.replace('.pdf', '')}`,
            use_filename: true,
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          },
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    const result = await uploadPromise();

    const note = await Note.create({
      title: req.body.title,
      subject: req.body.subject,
      semester: req.body.semester,
      department: req.body.department,
      fileUrl: result.secure_url,
      fileName: req.file.originalname,
      uploadedBy: req.user._id,
    });
    res.status(201).json(note);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// get notes

export const getNotes = async (req, res) => {
  try {
    // const notes = await Note.find({
    //   semester: req.user.semester,
    //   department: req.user.department,
    // });
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// update note

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    let fileUrl = note.fileUrl;

    if (req.file) {
      const uploadPromise = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'campushub',
              resource_type: 'raw',
            },
            (error, result) => {
              if (error) reject(error);

              resolve(result);
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadPromise();

      fileUrl = result.secure_url;
    }

    note.title = req.body.title;

    note.subject = req.body.subject;

    note.semester = req.body.semester;

    note.department = req.body.department;

    note.fileUrl = fileUrl;

    await note.save();

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete notes

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: 'Note deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
