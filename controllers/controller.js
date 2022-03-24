const {Op} = require('sequelize');
const {Bootcamp, BootcampDetail, User } = require('../models');
const bcryptjs = require('bcryptjs');
const res = require('express/lib/response');

class Controller {
    static home (req, resp) {
        console.log('home controller')
        resp.render('home')
    }

    static register(req,resp) {
        console.log('register controller')
        Bootcamp.findAll()
        .then(data => {
            resp.render('formRegister', {data})
        })
        .catch(err => {
            resp.send(err)
            console.log(err)
        })
       

    }

    static register2(req, resp){
        console.log('register 2 controller')
       // console.log(req.body)
        const {username, email, password, role, bootcamp} = req.body
        const obj = {
            username:username,
            email:email,
            password:password,
            role:role,
            BootcampId:bootcamp
        }

        //console.log(obj)

        User.create((obj))
        .then(() => {
            resp.redirect('/')
        })
        .catch(err => {
           resp.send(err)
           console.log(err);
        })
    }

    static login(req, resp){
        //console.log(req.query)
        const {err} = req.query
        console.log('login controller');
        resp.render('formLogin', {err});
    }

    static login2(req, resp){
        console.log('login 2 controller');
        console.log(req.body)
        const {username, password} = req.body
        const err = []
        User.findOne({where:{username}})
        .then(data => {
            console.log(data)
            if(data === null){
               resp.redirect('/login?err=username/password is invalid')
            } else {
                const isValid = bcryptjs.compareSync(password, data.password)
                if (isValid === false){
                    resp.redirect('/login?err=username/password is invalid')
                } else {
                    resp.redirect('/')
                }
            }
        })
        .catch(err => {
            console.log(err);
            resp.send(err)
            
        })

    }


}

module.exports = Controller