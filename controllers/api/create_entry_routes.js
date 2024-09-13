const router = require("express").Router();
const Diary = require("../../models/Diary.js");
const withAuth = require("../../utils/auth.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//localhost:3001/api/create
router.post("/",upload.single('audio'),async (req, res) => {
  console.log(req.body,"req.body");
  const audioPath = req.file ? req.file.path : null;  // Get the path of the uploaded file
  // console.log("req.file.path :",req.file.);
  try {
  
    const diaryData = await Diary.create({
      title: req.body.title,
      mood_id: req.body.mood_id,
      description: req.body.description,
      audio_path: audioPath,
      date_created: req.body.date_created,
      user_id: req.session.user_id,
      time_stamp: req.body.time_stamp,
      label: req.body.label,            
      polarity: req.body.polarity     
    });
    res.status(200).json(diaryData);
    console.log("suceess in create_entry_routes.js");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
