const express = require('express');
const firebase = require('firebase');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});
router.post('/login', function(req, res, next) {
  const user = req.body.user;
  console.log(user);
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((logado) => {
    console.log(logado);
    res.redirect('/login');
  }).catch((error) => {
    console.log(error);
  });
});
router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', { title: 'Cadastro' });
});
router.post('/cadastro', function(req, res, next) {
  const user = req.body.user;
  console.log(user);
  firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then((userF)=>{
    res.redirect('/login');
    console.log(userF);
  }).catch((error)=>{
    res.redirect('/login');
    console.log("error");
  });
});

module.exports = router;
