const express = require('express');
const router = express.Router();
const Application = require('../model/applicationModel');

router.get('/application/list', async (req, res) => {
  let list = await Application.find({});
  console.log('list : ', list);
  res.render('application_list', {
    list: list
  })
});

module.exports = router;
