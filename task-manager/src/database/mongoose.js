const mongoose = require('mongoose')

//connects to the database
//mongoose taps of from mongodb from mongodb.js
//we can use the same url as mongodb.js, but we just need to add the folder name in
//but we can use a different folder name because it is very different from mongodb
mongoose.connect(process.env.MONGODB_URL)
