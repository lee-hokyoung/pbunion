const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/outside', async (req, res, next) => {
  res.render('outside',{
    active:'branding'
  });
});
router.get('/inside', async (req, res, next) => {
  res.render('inside',{
    active:'branding'
  });
});

module.exports = router;
