const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller');

router.get('/', (req, res)=> res.render('home'));

router.get('/register', Controller.register);
router.post('/register', Controller.register2);

router.get('/login', Controller.login)
router.post('/login', Controller.login2)

router.use(function (req, res, next) {
   !req.session.userId ? res.redirect('/login?err=please login first') : next()
})

router.get('/logout', Controller.logout);

const fn = function(req, res, next) {
   req.session.userRole === 'admin' ? next() : res.redirect('/bootcamps')
}

router.get('/bootcamps', Controller.bootcamps);

router.get('/bootcamps/add', fn, Controller.bootcampsAdd)
router.post('/bootcamps/add', fn, Controller.bootcampsAdd2)

router.get('/bootcamps/:BootcampId/delete', fn, Controller.bootcampsIdDel)

router.get('/bootcamps/:BootcampId/detail', Controller.bootcampsIdDetail);

router.get('/bootcamps/:BootcampId/edit', fn, Controller.bootcampsIdEdit)
router.post('/bootcamps/:BootcampId/edit', fn, Controller.bootcampsIdEdit2)

module.exports = router