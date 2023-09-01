const express = require('express');
const path = require('path');
const router = express.Router();

const usercontroller = require('../controller/user');

router.get('/',usercontroller.Getuser )

router.post('/',usercontroller.Postuser);

router.get('/appointments',usercontroller.getappointments);

router.get('/edit-user/:userId',usercontroller.getEditappointment);

router.post('/edit-user',usercontroller.postEditappointment)



module.exports =router;