const express = require('express')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const User = require('../models/users')
const userRouter = new express.Router()
const multer = require('multer')


//Calling the body from users.js and then sending it over using REST API
//By using postman, we are able to see if our rest API is working 
//and also to check if our data is sent over to the http via http request
userRouter.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

userRouter.post('/users/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

userRouter.post('/users/logoutAll', auth, async(req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

userRouter.get('/users/me', auth, async (req, res) => {
        res.send(req.user)    
    // User.find({}).then((user)=>{
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

// userRouter.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try{
//         const user = await User.findById(_id)
//         if(!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch(e) {
//         res.status(500).send(e)
//     }

//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     } 

//     //     res.send(_id)

//     // }).catch((e) => {
//     //     res.status(500).send(e)
//     // })
// })

userRouter.patch('/users/me', auth, async (req, res) => {
    // const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age'] 
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update'})
    }

    try {
        //another method to find ID and update
        //this taps on to the middleware function
        
        // const user = await User.findById(_id)

        updates.forEach((update) => {
           req.user[update] = req.body[update]
        })
        await req.user.save()

        // //this statement will bypass the middleware function
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        // if(!user){
        //     res.status(404).send()
        // }

        res.status(201).send(req.user)
    
    } catch (e) {
        res.status(500).send(e)
    }
})

userRouter.delete('/users/me', auth, async (req, res) => {

    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }

        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        
        cb(undefined, true)

        // cb(new Error('Must be PDF'))
        // cb(undefined, true)
        // cb(undefined, false)
        
    }
})

userRouter.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer =  await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

userRouter.get('/users/:id/avatar', async (req, res) => {
    try{

        const user = await User.findById(req.params.id);
        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

userRouter.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

module.exports = userRouter