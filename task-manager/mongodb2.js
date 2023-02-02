// CRUD create, read, update, delete

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:12017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('unable to connect to database')
    }
    const db = client.db(databaseName)

    db.collection('users').findOne({name: 'Valantia'}, (error, user) => {
        if(error){
            return console.log('unable to fetch')
        }

        console.log(user)
    })
})