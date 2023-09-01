const path = require('path');
const User = require('../models/user');
const rootDir = require('../helpers/path');

exports.Getuser = (req,res,next)=>{
    res.render('index',{
        path: '/',
        editing: false
    })
};

exports.Postuser = (req,res, next) =>{
  const Name = req.body.name;
  const Email = req.body.email;
  const PhoneNo = req.body.tel;
  const Date = req.body.date;
  const Time = req.body.time;
  User.create({
    Name: Name,
    Email:Email,
    PhoneNo:PhoneNo,
    Date:Date,
    Time:Time
  }).then((result)=>{
    console.log('User added')
    res.redirect('/appointments');
  }).catch((err)=>{
    console.log(err);
  })
};
    

exports.getappointments = (req, res, next) => {
    User.findAll().then(users=>{
      res.render('appointments', {
        users: users,
        path: '/appointments'
      });
    })
    
    .catch(err=>console.log(err))
  };

  exports.getEditappointment = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/appointments');
    }
    
    const userId = req.params.userId; 
    User.findByPk(userId).then(user => {
        if (!user) {
            return res.redirect('/');
        }
        res.render('edit-index', {
            pageTitle: 'Edit user',
            path: '/edit-user',
            editing: editMode,
            user: user
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postEditappointment = (req, res, next) => {
    const userId = req.body.userId; 
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedPhoneNo = req.body.tel;
    const updatedDate = req.body.date;
    const updatedTime = req.body.time;
    User.findByPk(userId).then(user => {
        user.Name = updatedName;
        user.Email = updatedEmail;
        user.PhoneNo = updatedPhoneNo;
        user.Date = updatedDate;
        user.Time = updatedTime;
        return user.save();
    })
    .then(result => {
        console.log(result); 
        res.redirect('/appointments');
    })
    .catch(err => {
        console.log(err);
    });
};
