const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('partnerShip',{
    active:'partnerShip'
  });
});

module.exports = router;
