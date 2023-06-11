/* Authentication Controller */
const express = require('express');
const router = express.Router();

const Question = require('../models/Question.js');

/* form login / password */
router.get('/', (req, res, next) => {
  console.log("MEMBER INDEX");

  // req admin code
  const admin = req.session.admin
  console.log('admin code = ' + admin)

  // req user_id
  const user_id = req.session.userID
  console.log('user_id = ' + user_id)
  
  // check if admin code is 0
  if (req.session.login && admin == 0) {
    console.log("admin == 0");
    res.render('members/index', { openQuestionsTable: Question.openQuestion(user_id),
      closeQuestionsTable: Question.closeQuestion(user_id) });
  // check if admin code is 1
  }else if (req.session.login && admin == 1){
    console.log('admin == 1')
    res.render('users/admin', {questionsReportTable: Question.listReport, 
      answersReportTable: Question.listAnswerReport,
      openQuestionsTable: Question.openQuestion(user_id),
      closeQuestionsTable: Question.closeQuestion(user_id)})
  }
  else {
    res.redirect('/users/login');
  }
});

module.exports = router;