const User = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const numSaltRounds = 7;
function findAll () {
    try {
        return User.find({});
    } catch (error) {
        console.log("user doesn't exist");
        return error;
    }
}

async function findMe(token){
    const pass = jwt.verify(token,process.env.JWT_SECRET);
    const userId = pass.sub
    const user = await User.findById(userId)
    return user
}
async function deleteUser(token) {
    let userId = null
    try {
        const pass = jwt.verify(token, process.env.JWT_SECRET)
        userId = pass.sub
    } catch (error) {
        console.log("user doesn't exist");
        return error;
    }
    return User.deleteOne({_id: userId});
}
async function addUser(user) {
    const hash = await bcrypt.hash(user['password'],numSaltRounds)
    const newUser = new User({...user,password:hash})
    try{
        await newUser.save()
        return newUser
    }catch (e) {
        throw new Error("user already exist")
    }
}

async function updateUser(token, newProperty){
    const pass = jwt.verify(token,process.env.JWT_SECRET)
    const userId = pass.sub
    const hash = await bcrypt.hash(newProperty.password,numSaltRounds)
    newProperty.password=hash
    const user = await User.findOneAndUpdate({_id:userId},newProperty)
    return user
}

async function verify(username, password) {
    try {
        const user = await User.findOne({username});
        const compare = await bcrypt.compare(password, user.password);
        return compare;
    } catch (err) {
        console.log("Error de verification");
        console.error(err);
        return null;
    }
}
async function generateJWT(id) {
    return jwt.sign({sub:id}, process.env.JWT_SECRET);
}


module.exports.findAll = findAll;
module.exports.findMe = findMe;
module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.verify = verify;
module.exports.generateJWT = generateJWT ;
