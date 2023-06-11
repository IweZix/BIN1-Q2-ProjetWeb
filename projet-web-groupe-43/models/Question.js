const db = require('./db_conf');

// display the list of question
module.exports.list = () => db.prepare("SELECT * FROM questions WHERE right_answer = 0 ORDER BY date DESC").all();
// display the list of answer
module.exports.listanswer = () => db.prepare("SELECT * FROM answers ORDER BY date").all();

// add a new question
module.exports.save = (data) => {
  const stmt = db.prepare('INSERT INTO questions(title, num_category, question) VALUES (?, ?, ?)');
  const info = stmt.run(data.title, data.num_category, data.question);
  console.log("questions model save" + info.changes);
  // TODO add user_id
  // foreign key
};

// add a new answer
module.exports.saveAnswer = (data) => {
  const stmt = db.prepare('INSERT INTO answers(subject, answer,question_id,user_id,report,certified) VALUES (?,?,?,?,0,0)');
  const info = stmt.run(data.title, data.answer,data.question_id,data.user_id);
  console.log("answers model save" + info.changes);
};

// display the list of question report
module.exports.listReport = () => db.prepare("SELECT * FROM questions WHERE report = 1 ORDER BY date DESC").all();

// delete a question
module.exports.deleteQuestion = (id) => db.prepare('DELETE FROM questions WHERE question_id = ?').run(id);

// accept a question 
module.exports.acceptQuestion = (id) => db.prepare('UPDATE questions SET report = 0 WHERE question_id = ?').run(id);

// display the list of report answers
module.exports.listAnswerReport = () => db.prepare("SELECT * FROM answers WHERE report = 1 ORDER BY date DESC").all();

// delete an answer
module.exports.deleteAnswer = (answer_id) => db.prepare("DELETE FROM answers WHERE answer_id = ?").run(answer_id);

// accept an answer
module.exports.acceptAnswer = (answer_id) => db.prepare("UPDATE answers SET report = 0 WHERE answer_id = ?").run(answer_id);

// display all open question's user
module.exports.openQuestion = (id) => db.prepare("SELECT * FROM questions WHERE user_id = ? AND right_answer = 0").all(id);

// display all close question's user
module.exports.closeQuestion = (id) => db.prepare("SELECT * FROM questions WHERE user_id = ? AND right_answer = 1").all(id);

// delete answers of id question
module.exports.deleteAnswerQuestion = (id) => db.prepare("DELETE FROM answers WHERE question_id = ?").run(id)

// add a new question
module.exports.save = (data) => {
  const stmt = db.prepare('INSERT INTO questions(title, num_category, question, user_id, report, right_answer) VALUES (?, ?, ?, ?, 0, 0)');
  const info = stmt.run(data.title, data.num_category, data.question, data.user_id);
  console.log("questions model save" + info.changes);
};

module.exports.userid = (email) => {
  return db.prepare('SELECT user_id FROM questions WHERE email = ?').all(email)
}

// search a question 
module.exports.search = (title) => {
  return db.prepare('SELECT * FROM questions WHERE title LIKE ?').all('%' + title + '%');
}

module.exports.lastRowId = () => db.prepare('SELECT last_insert_rowid() AS rowId').get();

// click on Java
module.exports.searchJava = () => {
  return db.prepare('SELECT * FROM questions WHERE num_category = 1 ORDER BY date').all();
}

// click on JavaScript
module.exports.searchJavaScript = () => {
  return db.prepare('SELECT * FROM questions WHERE num_category = 2 ORDER BY date').all();
}

// click on Python
module.exports.searchPython = () => {
  return db.prepare('SELECT * FROM questions WHERE num_category = 3 ORDER BY date').all();
}

// click on SQL
module.exports.searchSQL = () => {
  return db.prepare('SELECT * FROM questions WHERE num_category = 4 ORDER BY date').all();
}

// click on HTML
module.exports.searchHTML = () => {
  return db.prepare('SELECT * FROM questions WHERE num_category = 5 ORDER BY date').all();
}

// click on CSS
module.exports.searchCSS = () => {
  return db.prepare('SELECT * FROM questions WHERE num_category = 6 ORDER BY date').all();
}

// click on Swift
module.exports.searchSwift = () => {
  return db.prepare('SELECT * FROM questions WHERE num_category = 7 ORDER BY date').all();
}

// click on C#
module.exports.searchCSharp = () => {
  return db.prepare('SELECT * FROM questions WHERE num_category = 8 ORDER BY date').all();
}

// click on PHP
module.exports.searchPHP = () => {
  return db.prepare('SELECT * FROM questions WHERE num_category = 9 ORDER BY date').all();
}

// search a question
module.exports.searchQuestion = (data) => {
  return db.prepare('SELECT * FROM questions  WHERE question_id = ?').all(data);
};

// search answer for question page 
module.exports.searchAnswersNotCertified = (data) => {
  return  db.prepare('SELECT * FROM answers WHERE question_id = ? AND certified = 0').all(data);
};
// search answer for question page 
module.exports.searchAnswersCertified = (data) => {
  return  db.prepare('SELECT * FROM answers WHERE question_id = ? AND certified = 1').all(data);
};
//certified
module.exports.certified= (answer_id) =>{ 
  db.prepare('UPDATE answers SET certified =1 WHERE answer_id=?').run(answer_id);
};

//reportAnswer
module.exports.report= (answer_id) =>{ 
  db.prepare('UPDATE answers SET report =1 WHERE answer_id=?').run(answer_id);
};

//reportQuestion
module.exports.reportQuestion= (question_id) =>{ 
  db.prepare('UPDATE questions SET report =1 WHERE question_id=?').run(question_id);
};
