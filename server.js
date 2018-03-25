const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost/siteDb';
const User = require('./model/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

app.post('/api/user/login', (req, res) => {
  mongoose.connect(url, function(err){
  if(err) throw err;
    User.find({
      username : req.body.username, password : req.body.password
    }, function(err, user){
      if(err) throw err;
      if(user.length === 1){
        return res.status(200).json({
          status: 'success',
          data: user
        })
      } else {
        return res.status(200).json({
          status: 'fail',
          message: 'Login Failed'
        })
      }
    })
  });
})

app.get('/api/users', (req, res) => {
  mongoose.connect(url,  function(err){
    if(err) throw err;
    User.find( {}, [] , function (err, user) {
      return res.status(200).json({
        status: 'Loading users data success',
        data: user
    })
    })
  });
})

app.post('/api/user/add', (req, res) => {
    mongoose.connect(url,  function(err){
      var x = new mongoose.mongo.ObjectId();
      var y = new mongoose.mongo.ObjectId();
      var z = new mongoose.mongo.ObjectId();
      const myData = new User({
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          skills: [
              {
                  id: x,
                  skill: 'Skill First',
                  level: 10
              },
              {
                  id: y,
                  skill: 'Skill Second',
                  level: 3
              },
              {
                  id: z,
                  skill: 'Skill Third',
                  level: 3
              }
          ]
      })
      myData.save()
        .then((err, user) => {
          return res.status(200).json({
              status: 200,
              data: user
          })
      });
  })
})

app.listen(3000, () => console.log('Site middleware server running on port 3000!'))
