const express = require('express');
const firebase = require('firebase');
const router = express.Router();
const mongoose =  require('mongoose');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  User.getAll().then((results) => {
  var tam = results.length;
  console.log(tam);
var i;
   for (i=0;i<tam;i++) {
     User.delete(results[i]._id).then(() => {

  }).catch((err) => {
    console.log(error);
  });

}
  }).catch((err) => {
    console.log(error);
      res.render('login', { title: 'Login' });
  });

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
      User.getById("5d3ef2091ff5137814f64a48").then((id) => {
          console.log(id);
          const user = {
            email: 'ana@gmail.com'
          }
          User.update(id,user).then(() => {

            res.render('cadastro', { title: 'Cadastro' });
          }).catch((err) => {
            console.log(error);
            res.render('cadastro', { title: 'Cadastro' });
          });
        }).catch((err) =>{
          console.log(error);
          res.render('cadastro', { title: 'Cadastro' });
        });


});
router.post('/cadastro', function(req, res, next) {
  const user = req.body.user;
  console.log(user);
  firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then((userF)=>{
    User.create(user).then((id) => {
      console.log(id);
      res.redirect('/login');
    }).catch((error) =>{
      console.log(error);
        res.redirect('/');
    });
  }).catch((error)=>{
    res.redirect('/login');
    console.log("error");
  });
});

module.exports = router;
