const express = require('express');
const router = express.Router();
const passport = require('passport');
const Application = require('../model/applicationModel');
const middle = require('../router/middle');

router.get('/login', middle.isNotLoggedIn, async(req, res) => {
  res.render('admin_auth');
});
router.post('/login', middle.isNotLoggedIn, async(req, res, next) => {
  passport.authenticate('local', (authError, user, info)=>{
    console.log('info : ', info);
    if(info){
      return res.send('<script>alert("' + info.message + '"); location.href = "/admin/login";</script>');
    }
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      console.log('not user');
      return res.redirect('/admin/login');
    }
    return req.login(user, async (loginError) => {
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      res.redirect('/admin/application/list');
    });
  })(req, res, next);
});
router.get('/logout', middle.isLoggedIn, async(req, res) => {
  req.logout();
  req.session.destroy();
  res.render('admin_auth');
});
// 지원자 리스트
router.get('/application/list', middle.isLoggedIn, async (req, res) => {
  let user = req.session.passport.user;
  let list = await Application.find({});
  console.log('list : ', list);
  res.render('application_list', {
    title:'신청자 리스트',
    list: list,
    active:'application',
    user:user
  });
});
// 지원자 삭제
router.delete('/application/:id', middle.isLoggedIn, async(req, res) => {
  let id = req.params.id;
  let result = await Application.deleteOne({_id:id});
  res.json(result);
});
module.exports = router;