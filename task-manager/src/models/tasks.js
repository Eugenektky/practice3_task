const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{

    timestamps: true

})

//creating new task, homework 2
const Tasks = mongoose.model('Tasks', taskSchema)

// const newTasks = new Tasks({
//     description: 'Cleaning the house',
//     completed: false
// })

// newTasks.save().then(()=>{
//     console.log(newTasks)
// }).catch((error) =>{
//     console.log(error)
// })

module.exports = Tasks