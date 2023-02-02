const express = require('express')
require('./database/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000

// //use middleware
// //without middleware:   new request -> run route handler
// //with middleware:      new request -> do something (created by developer) -> run route handler
// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
//     console.log(req.method, req.path)
//     next()
// })

// app.use((req, res, next) => {
//     if(req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH' || req.method === 'DELETE'){
//         res.status(503).send('Server under maintenance')
//     } else {
//         next()
//     }
// })

//file upload with express from multer
// const multer = require('multer')
// const upload = multer({
//     dest: 'photos',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
//             return cb(new Error('Please upload an image'))
//         }
//         cb(undefined, true)
//     }
// })

// const errorMiddleware = (req, res, next) => {
//     throw new Error('from my middleware')
// }

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,() => {
    console.log('Server is up and running ' + port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisisuniqueid', {expiresIn: '1 seconds'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisisuniqueid')
//     console.log(data)
// }

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'uwa2pxf5'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare(password, hashedPassword)
//     console.log(isMatch)
// } 

// myFunction()