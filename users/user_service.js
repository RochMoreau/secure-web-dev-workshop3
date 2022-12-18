const User = require('./user_model')
const bcrypt = require('bcrypt')

async function register (username, password, role) {
    const hash = await bcrypt.hash(password, 10)
    const user = new User({username, password: hash, role})
    return await user.save()
}

async function checkPassword (username, password) {
    const user = await User.findOne({username})
    if (!user) { return false; }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return false;
    }
    return user;
}

async function getSelfUsername(req, res) {
    res.json({
        id: req.user.id,
        username: req.user.username,
        password: req.user.password
    })
}

async function updateSelfUsername(req, res) {
    let obj = {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.user.role
    }
    const user = await User.findOneAndUpdate(req.user._id, obj, {new:true});
    res.send(user);
}

async function deleteUsername(req, res) {
    await User.deleteOne({ username: req.user.username });
    res.send("Username : " + req.user.username + " a bien été supprimé");
}

async function getAllUsernames (req, res) {
    let usernames = [];
    let users = await User.find();
    for(let key in users){
        usernames.push(users[key].username);
    }
    res.send(usernames);
}

module.exports = {getAllUsernames, deleteUsername, getSelfUsername, updateSelfUsername, register, checkPassword}