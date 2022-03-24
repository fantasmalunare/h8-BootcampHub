const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller');

// middleware that is specific to this router

// define the home page route
router.get('/', Controller.home)
// define the about route
router.get('/register', Controller.register)
router.post('/register', Controller.register2)
router.get('/login', Controller.login)
router.post('/login', Controller.login2)

module.exports = router