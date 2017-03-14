const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// user Schema
const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true
    },
    userrole:{
        type:String,
        required:true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
// get User details by user id
module.exports.getUserById =function(id, callBack){
    User.findById(id,callBack);
}
// get User by user name
module.exports.getUserByUsername =function(username, callBack){

    const query ={username: username};
    User.findOne(query,callBack);
}

// get User by user name
module.exports.getUserByEmail =function(email, callBack){

    const query ={email: email};
    User.findOne(query,callBack);
}

//TODO get users list by user type
module.exports.getUsersByUserType = function(){
}

//TODO get user list by user Role
module.exports.getUsersByUserRole = function(){
}

//TODO get user list by  Block user
module.exports.getUsersByBlockUser = function(){
}

//TODO get user list by  Country
module.exports.getUsersByCountry = function(){
}

//TODO get user list by  state
module.exports.getUsersByState = function(){
}

//TODO get user list by  District
module.exports.getUsersByDistrict = function(){
}

//TODO get user list by  Taluk
module.exports.getUsersByTaluk = function(){
}

//TODO get user list by ward
module.exports.getUsersByWard = function(){
}

//TODO get user list by Village Blocks
module.exports.getUsersByBlocks = function(){
}

//TODO get user list by Cluster
module.exports.getUsersByCluster = function(){
}

//TODO get user list by Data Entry
module.exports.getUsersByDataEntry = function(){
}

//TODO get Total User Count
module.exports.getTotalUsersCount = function(){
}

//TODO get Total User by Type Count
module.exports.getTotalUsersByTypeCount = function(){
}
//TODO get Total User by Role Count
module.exports.getTotalUsersByRoleCount = function(){
}

//TODO get Total User by Country Count
module.exports.getTotalUsersByCountryCount = function(){
}

//TODO get Total User by State Count
module.exports.getTotalUsersByStateCount = function(){
}
//TODO get Total User by District Count
module.exports.getTotalUsersByDistrictCount = function(){
}
//TODO get Total User by Taluk Count
module.exports.getTotalUsersByTalukCount = function(){
}
//TODO get Total User by ward Count
module.exports.getTotalUsersByWardCount = function(){
}
//TODO get Total User by Data Entry Count
module.exports.getTotalUsersByDataEntryCount = function(){
}
//TODO get Total User by Cluster Count
module.exports.getTotalUsersByClusterCount = function(){
}

//TODO get Total User by Blocks Count
module.exports.getTotalUsersByBlocksCount = function(){
}



// module exports models users add user
module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10, function (err, salt){
        bcrypt.hash(newUser.password, salt, function(err,hash){
            if(err) throw err;
            newUser.password=hash;
            newUser.save(callback);
        })
    });
}
// module exports the compare password
module.exports.comparePassword = function(candidatePassword, hash, callBack){

    bcrypt.compare(candidatePassword, hash, function(err,isMathch){
        if(err)throw err;
        callBack(null, isMathch);
    });
}
//TODO module exports models users edit user
module.exports.editUser = function(){
}
//TODO module exports models users update user
module.exports.updateUser = function(){
}
//TODO module exports models users block user
module.exports.blockUser = function(){
}
//TODO module exports models users delete user
module.exports.deleteUser = function(){
}



