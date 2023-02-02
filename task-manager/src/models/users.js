const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email Address')
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Please key in password again')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be more than 0')
            }
        }
    },
    // Users can only create 1 unique account.
    // this helps the user to login to multiple devices 
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {

    timestamps: true

})

userSchema.virtual('tasks', {
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET_KEY)

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Incorrect password!')
    }
    return user
}

//next is actually show that our code has finished running to show the asynchronous process
//to hash the plain text password
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    // console.log('just before the saving')
    
    next()
})

//Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user =  this

    await Task.deleteMany({ owner: user.id })

    next()
})

//creating new users , homework 1
//this 2nd object, send to Schema.
// the 2nd object actually uses the schema secretly which we will
// explicitly use it now so that we can use the middleware function
const User = mongoose.model('User', userSchema)

// const newUser = new User({
//     name: 'Eugene   ',
//     email: 'eugenektky96@hotmail.com',
//     password: 'Password',
//     age: 20
// })

// //this is to see if our newly created user is successful or not
// newUser.save().then(()=>{
//     console.log(newUser)
// }).catch((error)=>{
//     console.log('Error', error)
// })


module.exports = User