const express = require('express');
const router = express.Router();

const Question = require('../models/Question.js');

// Get create question page 
router.get('/create', (req, res, next) => {
    console.log('***** GET CREATE QUESTION PAGE *****');
    const userid = req.session.userID
    console.log('user_id = ' + userid)
    if (userid == undefined){
      res.render('users/login')
    }
    res.render('questions/createQuestion');
});

// Add a question 
router.post('/add', (req, res, next) => {
    console.log('***** CREATE QUESTION ADD *****');
    // category
    const cat = req.body.category;
    console.log('category = ' + cat)
    // subject
    const subject = req.body.subject
    console.log('subject = ' + subject)
    // question
    const question = req.body.question
    console.log('question = ' + question)
    // user_id
    const userid = req.session.userID
    console.log('user_id = ' + userid)

    // msg
    const msgNotConnected = 'You are not connected'
    const msgSubjectUnedefined = 'Title is not completed'
    const msgQuestionUnedefined = 'Question is not completed'

    // check if the subject is defined
    if (!subject){
        console.log('subject unedefined')
        res.render('/questions/createQuestion', {msg: msgSubjectUnedefined})
    }
    
    // check if the question is defined
    if (!question){
        console.log('question unedefined')
        res.redirect('/questions/createQuestion')
    }
    
    // check if user exists
    if (userid > 0){
        console.log('userID > 0 -> OK')
        Question.save({
        user_id: userid,
        title: req.body.subject,
        num_category: cat,
        question: req.body.question,});
        let id_question = Question.lastRowId().rowId;
        res.redirect('/questions/click?id=' + id_question);
    }else{
        console.log('userID > 0 -> KO')
        res.render('questions/createQuestion',  {msg: msgNotConnected})
    }
});

// delete a question
router.post('/deleteQuestion', (req, res, next) => {
    console.log('***** DELETE A QUESTION *****')
    const question_id = req.body.id
    const user_id = req.session.userID
    console.log(question_id)
    
    // delete answer of question
    Question.deleteAnswerQuestion(question_id)
    // delete question 
    Question.deleteQuestion(question_id)

    res.render('users/admin', {questionsReportTable: Question.listReport, 
        answersReportTable: Question.listAnswerReport, 
        openQuestionsTable: Question.openQuestion(user_id),
        closeQuestionsTable: Question.closeQuestion(user_id)})
})

// accept a question
router.post('/acceptQuestion', (req, res, next) => {
    console.log('***** ACCEPT A QUESTION *****')
    const question_id = req.body.id
    const user_id = req.session.userID
    console.log(question_id)
    Question.acceptQuestion(question_id)
    res.render('users/admin', {questionsReportTable: Question.listReport, 
        answersReportTable: Question.listAnswerReport, 
        openQuestionsTable: Question.openQuestion(user_id),
      closeQuestionsTable: Question.closeQuestion(user_id)})
})

// delete an answer
router.post('/deleteAnswer', (req, res, next) => {
    console.log('***** DELETE AN ANSWER *****')
    const id = req.body.id
    const user_id = req.session.userID
    console.log(id)
    Question.deleteAnswer(id)
    res.render('users/admin', {questionsReportTable: Question.listReport, 
        answersReportTable: Question.listAnswerReport, 
        openQuestionsTable: Question.openQuestion(user_id),
        closeQuestionsTable: Question.closeQuestion(user_id)})
})

// accept an answer
router.post('/acceptAnswer', (req, res, next) => {
    console.log('***** ACCEPT AN QUESTION *****')
    const id = req.body.id
    const user_id = req.session.userID
    console.log(id)
    Question.acceptAnswer(id)
    res.render('users/admin', {questionsReportTable: Question.listReport, 
        answersReportTable: Question.listAnswerReport, 
        openQuestionsTable: Question.openQuestion(user_id),
      closeQuestionsTable: Question.closeQuestion(user_id)})
})

router.get('/click', (req, res, next) => {
  let notconnectedAnswer = true;
  let certified_answer =true;
  let can_certified = true;
    let id_question=req.query.id;
  let question=Question.searchQuestion(id_question);
  let id_member= question[0].user_id
  console.log(question);
  let AnswersNotCertified = Question.searchAnswersNotCertified(id_question);
  let AnswersCertified = Question.searchAnswersCertified(id_question);
  console.log(AnswersNotCertified +AnswersCertified);
   // user_id
   const user_id = req.session.userID
   console.log('user_id = ' + user_id)
   console.log('question user id   '+id_member)
  if(user_id!=id_member){
     console.log('id user question ok')
     can_certified=false
  }
  if(user_id === undefined){
    
     notconnectedAnswer = false
  }
  
  for (answer of AnswersCertified) {
    
    console.log("certified1 : " +answer.certified );
  if(answer.certified==1){
      certified_answer=false
    }
    }
    
  
      res.render('questions/user',{questionsTable : question ,answersTableNotCertified : AnswersNotCertified, answersTableCertified : AnswersCertified, question_id : id_question , boolean : notconnectedAnswer, boolean2 :can_certified,boolean3: certified_answer});
    });

// add answer
router.post('/addAnswer', (req, res, next) => {
    console.log("POST ADD answer");
    console.log(req.body);
    
    
      console.log('connected')
    Question.saveAnswer({
      title: req.body.titleAnswer,
      answer : req.body.answerAnswer,
      question_id : req.body.question_idAnswer,
      user_id : req.session.userID,});
      res.redirect('/questions/click?id=' + req.body.question_idAnswer);
    
  
     });
      
    
    
  
  //certified
  router.post('/certified',(req, res, next) =>{
    const answer_id= req.body.id 
    const question_id=req.body.question_id 
    Question.certified(answer_id)
    res.redirect('/questions/click?id=' +req.body.question_id)
});

//report
router.post('/report',(req, res, next) =>{
  const answer_id= req.body.id 
  const question_id=req.body.question_id 
  Question.report(answer_id)
  res.redirect('/questions/click?id=' +req.body.question_id)
});
  
//report Question
router.post('/reportQuestion',(req, res, next) =>{
  const question_id=req.body.question_id 
  Question.reportQuestion(question_id)
  res.redirect('/questions/click?id=' +req.body.question_id)
});


module.exports = router;
