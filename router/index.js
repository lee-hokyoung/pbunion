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

module.exports = router;
