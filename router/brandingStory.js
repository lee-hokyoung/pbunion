const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('brandingStory',{
    active:'brandingStory'
  });
});

module.exports = router;
