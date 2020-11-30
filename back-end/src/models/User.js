const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	password: String,
    email: String,
    address:String,
    statecode:String,
    zipcode:String,
    long:Number,
    lat:Number,
})

module.exports = mongoose.model('User', UserSchema)