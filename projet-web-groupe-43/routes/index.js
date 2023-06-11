const express = require('express');
const router = express.Router();

const Question = require('../models/Question.js');

// TODO create your controllers

/***** GET HOME PAGE *****/
router.get('/', (req, res, next) => {
    console.log('***** GET HOME PAGE *****');
    res.render('index', { questionsTable: Question.list()});
});

/***** GET SEARCH PAGE *****/
router.get('/search', (req, res, next) => {
    console.log('***** GET SEARCH PAGE *****');
    const title = req.query.searchText;
    console.log(title)
    questionsTable = Question.search(title)
    res.render('index', {questionsTable});
});

/***** GET JAVA PAGE *****/
router.get('/categoryJava', (req, res, next) => {
    console.log('***** GET JAVA PAGE *****');
    questionsTable = Question.searchJava()
    console.log(questionsTable)
    res.render('index', {questionsTable});
});

/***** GET JAVASCRIPT PAGE *****/
router.get('/categoryJS', (req, res, next) => {
    console.log('***** GET JAVASCRIPT PAGE *****');
    questionsTable = Question.searchJavaScript()
    console.log(questionsTable)
    res.render('index', {questionsTable});
});

/***** GET PYTHON PAGE *****/
router.get('/categoryPy', (req, res, next) => {
    console.log('***** GET PYTHON PAGE *****');
    questionsTable = Question.searchPython()
    console.log(questionsTable)
    res.render('index', {questionsTable});
});

/***** GET SQL PAGE *****/
router.get('/categorySQL', (req, res, next) => {
    console.log('***** GET SQL PAGE *****');
    questionsTable = Question.searchSQL()
    console.log(questionsTable)
    res.render('index', {questionsTable});
});

/***** GET HTML PAGE *****/
router.get('/categoryHTML', (req, res, next) => {
    console.log('***** GET HTML PAGE *****');
    questionsTable = Question.searchHTML()
    console.log(questionsTable)
    res.render('index', {questionsTable});
});

/***** GET CSS PAGE *****/
router.get('/categoryCSS', (req, res, next) => {
    console.log('***** GET CSS PAGE *****');
    questionsTable = Question.searchCSS()
    console.log(questionsTable)
    res.render('index', {questionsTable});
});

/***** GET SWIFT PAGE *****/
router.get('/categorySWIFT', (req, res, next) => {
    console.log('***** GET SWIFT PAGE *****');
    questionsTable = Question.searchSwift()
    console.log(questionsTable)
    res.render('index', {questionsTable});
});

/***** GET C# PAGE *****/
router.get('/categoryCSharp', (req, res, next) => {
    console.log('***** GET C# PAGE *****');
    questionsTable = Question.searchCSharp()
    console.log(questionsTable)
    const user_id = req.session.userID
    console.log(user_id)
    res.render('index', {questionsTable});
});

router.get('/categoryPHP', (req, res, next) => {
    console.log('***** GET PHP PAGE *****');
    questionsTable = Question.searchPHP()
    console.log(questionsTable)
    const user_id = req.session.userID
    console.log(user_id)
    res.render('index', {questionsTable});
});

module.exports = router;