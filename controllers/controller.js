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
        .catch(err => {
            if(err.name === 'SequelizeValidationError') {
               err = err.errors.map(e => e.message)
            }
            res.send(err);
         })
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
        const {search} = req.query;

        if (search) {
            Bootcamp.findAll({where: {name: {[Op.iLike]: `%${search}%`}}})
            .then(data => res.render('bootcamps', {data, access}))
            .catch(err => res.send(err))
        } else {
            Bootcamp.withoutSearch()
            .then(data => res.render('bootcamps', {data, access}))
            .catch(err => res.send(err))
        }
    }

    static bootcampsAdd(req, res){
        res.render('formAddBootcamp');
    }

    static bootcampsAdd2(req, res){
        const {name, category, fee, duration, studentLimit } = req.body;

        BootcampDetail.create({fee, duration, studentLimit})
        .then(() => {
            return BootcampDetail.findAll({
                limit: 1,
                order: [['createdAt', 'DESC']]
            })
        })
        .then(data => {
            const BootcampDetailId = data[0].id;

            return Bootcamp.create({name, category, BootcampDetailId})
        })
        .then(() => res.redirect('/bootcamps'))
        .catch(err => {
            if(err.name === 'SequelizeValidationError') {
               err = err.errors.map(e => e.message)
            }
            res.send(err);
         })
    }

    static bootcampsIdDetail (req, res){
        const {BootcampId} = req.params;
        const access = req.session.userRole;

        Bootcamp.findByPk(BootcampId, {include: BootcampDetail})
        .then(data => res.render('bootcampDetail', {data, access, mvp}))
        .catch(err => res.send(err))
    }

    static bootcampsIdEdit (req,res) {
        const {BootcampId} = req.params;
        const {err} = req.query;
        Bootcamp.findByPk(BootcampId, {
            include:BootcampDetail,
            required: true
        })
        .then(data => {
            res.render('formEditBootcamp', {data})
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError') {
               err = err.errors.map(e => e.message)
            }
            res.send(err);
         })
    }
       
    static bootcampsIdEdit2 (req, res){
        const {name, category, fee, duration, studentLimit } = req.body;
        const { BootcampId } = req.params;

        BootcampDetail.update(
            {fee, duration, studentLimit},
            {where: {id: BootcampId}}
        )
        .then(() => {
            return Bootcamp.update(
                {name, category},
                {where: {BootcampDetailId: BootcampId}}
            )
        })
        .then(() => res.redirect(`/bootcamps/${BootcampId}/detail`))
        .catch(err => {
            if(err.name === 'SequelizeValidationError') {
               err = err.errors.map(e => e.message)
            }
            res.send(err);
         })
    }

    static delete(req, res){
        const {BootcampId} = req.params;
        
        BootcampDetail.destroy({where: {id:BootcampId}})
        .then(()=> res.redirect('/bootcamps'))
        .catch(err => res.send(err))
    }
}

module.exports = Controller