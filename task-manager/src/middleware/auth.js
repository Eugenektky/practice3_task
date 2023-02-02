const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req, res, next) => {
    // console.log('auth middleware')

    try {
        //replace removes words and replaces it with something else
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user

        next()

        // console.log('authentication successful')
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth