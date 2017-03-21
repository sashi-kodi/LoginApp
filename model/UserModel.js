var mongoose= require('mongoose');
var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    
    email:String
});

var UserModel= mongoose.model('UserModel', userSchema,'UsersTable');
module.exports = UserModel;