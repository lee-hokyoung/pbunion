const express = require('express');
const router = express.Router();
const Application = require('../model/applicationModel');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.post('/application', async (req, res) => {
  let insertData = new Application(req.body);
  let result = await insertData.save();
  res.json(result);
});
router.get('/application/list', async (req, res) => {
  console.log('1');
  let list = await Application.find({});
  console.log('2');
  res.render('application_list', {
    list: list
  })
});

module.exports = router;
