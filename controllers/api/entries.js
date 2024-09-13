
// dont remove it.....
// any additional code put by me in any file is enclosed under two dashed line : -------------------------------

const router = require('express').Router();
const Diary = require('../../models/Diary.js');

// API endpoint to fetch diary entries with timestamp, polarity, and label
router.get("/entries", async (req, res) => {
  try {
    const diaryEntries = await Diary.findAll({
      attributes: ["time_stamp", "polarity", "label"]
    });
    res.status(200).json(diaryEntries);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
