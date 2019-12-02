const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    active:'index'
  });
});
router.get('/about', (req, res)=>{
  res.render('about', {
    active:'index'
  });
});
router.get('/representation', (req, res)=>{
  res.render('representation', {
    active:'index'
  });
});

module.exports = router;
