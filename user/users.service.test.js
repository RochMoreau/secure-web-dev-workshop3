const usersService = require('./users.service')
const User = require('./users.model')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const{MongoClient} = require('mongodb')

jest.mock('./users.model')
const token = jwt.sign({sub:15}, process.env.JWT_SECRET);

describe('Find all user', ()=>{
    it('Should call model find',async()=>{
        User.find.mockResolvedValue([1,2,3,4])
        expect(await usersService.findAll()).toEqual([1,2,3,4])
        expect(User.find).toHaveBeenCalledTimes(1)
    })
})

describe('Verify', ()=>{
    it('Should verify corespondance user password',async()=>{
        jest.resetAllMocks()
        const hash = await bcrypt.hash("password",7)
        User.findOne.mockResolvedValue({username:"username",password:hash})
        expect(await usersService.verify("username","password")).toEqual(true)
        expect(User.findOne).toHaveBeenCalledTimes(1)
    })
})
describe('generateJWT',()=>{
    it('Should generate a token',async()=>{
        expect(await usersService.generateJWT(15)).toEqual(jwt.sign({sub:15}, process.env.JWT_SECRET))
    })
})

describe('Find Me',()=>{
    it('Should call findMe',async()=>{
        jest.resetAllMocks()
        User.findById.mockResolvedValue({id:15,username:"username",password:"hash"})
        expect(await usersService.findMe(token)).toEqual({id:15,username:"username",password:"hash"})
        expect(User.findById).toHaveBeenCalledTimes(1)
    })
})
describe('deleteUser',()=>{
    it('Should delete a user',async()=>{
        jest.resetAllMocks()
        User.deleteOne.mockResolvedValue({_id: "userId"})
        expect(await usersService.deleteUser(token)).toEqual({_id: "userId"})
        expect(User.deleteOne).toHaveBeenCalledTimes(1)
    })
    it('Should error token',async()=>{
        jest.resetAllMocks()
        User.deleteOne.mockResolvedValue({_id: "userId"})
        expect(await usersService.deleteUser("tiken")).toEqual({
            "message": "jwt malformed",
            "name": "JsonWebTokenError"
        })//erreur de token
    })
})
describe('updateUser',()=>{
    it('Should update user',async ()=>{
        jest.resetAllMocks()
        User.findOneAndUpdate.mockResolvedValue({_id:"userId"})
        expect(await usersService.updateUser(token,{username:"username",password:"password",role:"role"})).toEqual({_id:"userId"})
        expect(User.findOneAndUpdate).toHaveBeenCalledTimes(1)
    })
})

// il ne manque que addUser dans les testes unitaire
// mais comme on ne touche pas a la base de donnée avec jest je ne sais pas comment verifier


