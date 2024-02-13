const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    gender: { type: String},
    college: { type: String},
    dept: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }  // Default role is set to 'user'
});

const Register = mongoose.model('register', RegisterSchema);

module.exports = Register;
