const router = require('express').Router()
const userService = require('./user_service')
const authorizationMiddleware = require('../authorization/authorization.middleware')
const passport = require('passport')
let jwt = require('jsonwebtoken')

router.post('/register', async (req,res) => {
    console.log("yo le gang : " + req.username)
    const user = await userService.register(req.body?.username, req.body?.password, req.body?.role)
    res.status(200).send(user)
})

router.post('/login',
    passport.authenticate('local'),
    //authorizationMiddleware.canAccess([]),
    async (req, res) => {
        const payload = {
            sub: req.user._id,
        }
        let token = jwt.sign(payload, process.env.TOKEN_KEY);
        res.status(200).send({token});
    })

router.get('/me',  passport.authenticate('jwt', { session: false }), userService.getSelfUsername);

router.patch('/me',  passport.authenticate('jwt', { session: false }), userService.updateSelfUsername);

router.delete('/me', passport.authenticate('jwt', { session: false }), userService.deleteUsername);

//router.get('/', userService.getAllUsers);
    

// router.post('/login', 
// passport.authenticate('local'),
// async (req, res) => {
//     res.status(200).send(req.user)
// })

module.exports = router