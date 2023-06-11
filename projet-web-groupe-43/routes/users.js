const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;


// GET LOGOUT PAGE 
router.get('/members', (req, res, next) => {
  console.log('***** GET LOGOUT PAGE *****');
  res.render('memebers');
});

// GET LOGIN PAGE
router.get('/login', (req, res, next) => {
    console.log('***** GET LOGIN PAGE *****');
    res.render('users/login',{ errors: req.session.errors });
    req.session.errors = null;
});

// GET REGISTER PAGE 
router.get('/register', (req, res, next) => {
  console.log("USERS REGISTER");
  console.log("ERROR REGISTER");
  console.log(req.session.errors);
  res.render('users/register', { errors: req.session.errors });
  req.session.errors = null;
});

router.get('/', (req, res, next) => {
  console.log("USERS INDEX");
  res.render('users/login');
});

/* check login and password */
router.post('/login', (req, res, next) => {
  console.log("USERS LOGIN");
  const memberLogin = req.body.memberLogin;
  const email = req.body.memberEmail;
  // User in DB ? -> return the record of the user if found
  const userFound = User.find(memberLogin);
  console.log(userFound);
  console.log("User found" + JSON.stringify(userFound));
  if (bcrypt.compareSync(req.body.memberPassword, userFound.password)) {
    console.log("password correct");
    req.session.login=memberLogin
    const userFound = User.find(memberLogin);
    req.session.name = userFound.name
    req.session.firstname = userFound.firstname
    req.session.userID = userFound.user_id
    req.session.admin = userFound.admin
    res.redirect('/members');
   
  }else
  if(memberLogin != userFound ){
    req.session.errors = "Le mot de passe ou le login est incorrect ! ";
    res.redirect('/users/login');
  }
   else {
    console.log("bad password");
    req.session.errors = "Le mot de passe ou le login est incorrect ! ";
    res.redirect('/users/login');
  }
});

/* check login and password */
router.post('/logout', (req, res, next) => {
  console.log("USERS LOGOUT");
  req.session.destroy();
  res.redirect('/users/login');
});



// add user
router.post('/add', (req, res, next) => {
    console.log("USERS ADD");
    let WrongEmail=true
    const name = req.body.memberName
    const firstname = req.body.memberFirstname
    const email = req.body.memberEmail;
    const password = req.body.memberPassword;
    const confirmpassword = req.body.memberPasswordConfirmation;
    let firstname2= (firstname.replace(/\s/g, '')).toLowerCase();
    let name2= (name.replace(/\s/g, '')).toLowerCase();
    let stringMail= firstname2+"."+name2+"@student.vinci.be"
    let stringMail2= firstname2+"."+name2+"@vinci.be"
    if (email!=stringMail && email != stringMail2){
      console.log("wrong email"+email+"   "+ stringMail)
      req.session.errors = "L'adrresse email doit contenir votre email doit contenir votre nom.prénom@student.vinci.be ou nom.prénom@vinci.be ! ";
      res.redirect('/users/register');
    } else
    if (password !== confirmpassword) {
      console.log("password !== confirmpassword");
      req.session.errors = "Le mot de passe et le mot de passe de confirmation sont différents ! ";
      res.redirect('/users/register');
    } else

    if (User.find(email)) {
      console.log("user email already exist in DB");
      req.session.errors = "Cet email existe déjà en DB ! ";
      res.redirect('/users/register');
    } else {
      const passwordCrypted = bcrypt.hashSync(password, saltRounds);
      User.save({
        name: req.body.memberName,
        firstname: req.body.memberFirstname,
        email,
        password: passwordCrypted
      });
      res.redirect('/users/login');
    }
  });

module.exports = router;