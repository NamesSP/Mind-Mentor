const { Diary } = require('../../models');

const deleteDiary = async (req, res) => {
  try {
    const diaryData = await Diary.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id, // Ensure the user owns the diary entry
      },
    });

    if (!diaryData) {
      res.status(404).json({ message: 'No diary entry found with this id!' });
      return;
    }

    res.status(200).json(diaryData);
  } catch (err) {
    console.log("error in deleteDiary.js"+err);
    res.status(500).json(err);
  }
};

module.exports = deleteDiary;