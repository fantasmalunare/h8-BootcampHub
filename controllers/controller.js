const {Op} = require('sequelize');
const {Bootcamp, BootcampDetail, User } = require('../models');
const bcryptjs = require('bcryptjs');
const mvp = require('../helper/accounting');

class Controller {
    static register(req, res) {
        Bootcamp.findAll()
        .then(data => res.render('formRegister', {data}))
        .catch(err => res.send(err))
    }

    static register2(req, res){
        const {username, email, password, bootcamp} = req.body;
        const obj = {username, email, password, BootcampId:bootcamp}

        User.create((obj))
        .then(() => res.redirect('/login'))
        .catch(err => res.send(err))
    }

    static login(req, res){
        const {err} = req.query;
        res.render('formLogin', {err});
    }

    static login2(req, res){
        const {username, password} = req.body;

        User.findOne({where:{username}})
        .then(data => {
            if(data === null){
               res.redirect('/login?err=username/password cannot be empty')
            } else {
                const isValid = bcryptjs.compareSync(password, data.password)
                if (isValid){
                    req.session.userId = data.id;
                    req.session.userRole = data.role;
                    res.redirect('/bootcamps');
                } else {
                    res.redirect('/login?err=username/password is invalid')
                }
            }
        })
        .catch(err => res.send(err))
    }

    static logout (req, res) {
        req.session.destroy;
        res.redirect('/');
    }

    static bootcamps (req, res){
        const access = req.session.userRole;

        Bootcamp.findAll()
        .then(data => res.render('bootcamps', {data, access}))
        .catch(err => res.send(err))
    }

    static bootcampsAdd(req, res){
        let {err} = req.query;
        res.render('formAddBootcamp');
    }

    static bootcampsAdd2(req, res){
        console.log(req.body)
        const {} = req.body
        const obj = {

        }
        Bootcamp.create(obj)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static bootcampsIdDetail (req, res){
        const {BootcampId} = req.params;
        const access = req.session.userRole;

        Bootcamp.findByPk(BootcampId, {include: BootcampDetail})
        .then(data => res.render('bootcampDetail', {data, access, mvp}))
        .catch(err => res.send(err))
    }

    static bootcampsIdDel (req, res){
        console.log('bootcamps controller')
        const id = req.params.id
        Bootcamp.delete()
        .then(() => {
            res.redirect('/bootcamps')
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
        
    }

    static bootcampsIdEdit (req, res){
        console.log('bootcamps controller')
        const id = req.params.id
        res.render('formEditBootcamp')
        
    }

    static bootcampsIdEdit2 (req, res){
        console.log('bootcamps controller')
        const id = req.params.id
        console.log(req.body)
        const {} = req.body
        obj = {

        }
        Bootcamp.update(obj, {
            where: {
                id:id
            }
        })
        .then(() => {
            res.redirect('/bootcamps')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller