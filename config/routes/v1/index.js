const mongoose = require('mongoose')
const router = require('express').Router();
const user = require('../../../app/controllers/users')
const auth = require('../../middleware/isauth')
 router.post('/signup',user.signup)
 router.post('/login',user.login)
 router.post('/addteammember',user.addTeamMember)
 router.get('/getusers',user.getUsers)
 router.get('/getuserdetails',[auth,user.getUserDetails])

module.exports = router
