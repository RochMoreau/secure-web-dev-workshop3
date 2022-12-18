const router = require('express').Router()
const usersService = require('./users.service')
const passport = require('passport');
const authorisation = require('../middleware/middleware.strategy')
const {roleMiddleware} = require("../middleware/middleware.strategy");


router.post('/users/register', async (req, res) => {
    const user = await usersService.addUser(req.body)
    if (!user){
        return res.status(403).send("user already exist ")
    }
    return res.status(200).send(user)
})
/*router.post('/users/login',
    async (req, res) => {
    return res.status(200).send({users: await usersService.loginUser(req.body)})
})*/

router.post('/users/login',
    passport.authenticate('local',{failureRedirect: '/users/login'}, {session: false,}),

    async (req, res) => {
        const token = await usersService.generateJWT(req.user._id,req.user.role);
        return res.status(200).send({token: token});
    });

router.get('/users', async (req, res) => {
    return res.status(200).send({users: await usersService.findAll()})
})
router.get('/users/me',
    passport.authenticate('jwt',{session : false}),
    roleMiddleware(["admin"]),
    async(req,res) => {
    const token = await usersService.generateJWT(req.user._id,req.user.role);
    return res.status(200).send({users: await usersService.findMe(token),token:token})
})
router.delete('/users/me',
    passport.authenticate('jwt',{session: false}),
    roleMiddleware(['admin']),
    async (req, res) => {
    const token = await usersService.generateJWT(req.user._id,req.user.role);
    return res.status(200).send({users: await usersService.deleteUser(token)})
})
router.put('/users/me',
    passport.authenticate('jwt',{session:false}),
    authorisation.roleMiddleware(['admin']),
    async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    return res.status(200).send({users: await usersService.updateUser(token)})
})
module.exports = router