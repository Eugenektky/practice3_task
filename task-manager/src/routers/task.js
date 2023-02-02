const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/tasks')
const taskRouter = new express.Router()



taskRouter.post('/tasks', auth, async (req, res) => {
    // const tasks = new Task(req.body)

    const tasks = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await tasks.save()
        res.status(201).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }

    // console.log(req.body)
    // tasks.save().then(() => {
    //     res.status(201).send(tasks)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

//GET /tasks?completed=false
taskRouter.get('/tasks', auth, async (req, res) => {


    // if(req.query.completed){
    //     const task = await Task.find({
    //         owner: req.user._id,
    //         completed: false
    //     })
    // }

    try {
        if(req.query.completed){
            const task = await Task.find({
                owner: req.user._id,
                completed: req.query.completed === 'true',
                options: {
                    limit: parseInt(req.query.limit) || null,
                    skip: parseInt(req.query.skip) || null
                }
            })
            res.status(201).send(task)
        } else if(req.query.completed === 'false'){
            const task = await Task.find({
                owner: req.user._id,
                completed: req.query.completed === 'false',
                options: {
                    limit: parseInt(req.query.limit) || null,
                    skip: parseInt(req.query.skip) || null
                }
            })
            res.status(201).send(task)
        } else {
            const task =  await Task.find({ 
                owner: req.user._id,
                options:{
                    limit: parseInt(req.query.limit) || null,
                    skip: parseInt(req.query.skip) || null
                }
            })
            res.status(201).send(task)
        }
        // const task = await Task.find({ 
        //     owner: req.user._id,
        //     completed: match.completed
        // })
        //OR
        // await req.user.populate({
        //     path: 'tasks',
        //     match
        // }).execPopulate()
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.find({}).then((task)=>{
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

taskRouter.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        res.status(200).send(req.user.task)
    } catch(e){
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     } 

    //     res.send(_id)

    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})


taskRouter.patch('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({ Error: 'Invalid update!'})
    }

    try{
        const task = await Task.findOne({ _id, owner: req.user._id})
        // const task = await Task.findById(_id)

        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        task.save()
        
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        res.status(200).send(task)
    
    } catch (e) {
        res.status(500).send(e)
    }

})

taskRouter.delete('/tasks/:id', auth, async(req, res) => {

    try{
        const task =  await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        // const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = taskRouter