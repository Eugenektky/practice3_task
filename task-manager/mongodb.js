//CRUD create read update delete

const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()

// console.log(id)
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

const databaseName = 'task-manager'

//connects to the mongodb server
MongoClient.connect(process.env.connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to the database')
    } 
    
    //gives back a database reference, we can use db to manipulate the database
    const db = client.db(databaseName)
    

    // //deletes the id, name and age in database
    // const updatePromise = db.collection('users').deleteMany({
    //     Name: ('Eugene')
    // })

    // updatePromise.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })


    // //Updating the id, name and age in database
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('63ca3db28440a6c6195a779f')
    // },{
    //     $inc: {
    //         Age: 1
    //     }
    // })

    // updatePromise.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })




    // //searching the id, name and age in database
    // db.collection('users').findOne({_id: new ObjectID('63ca36753d2064f597f74e89')}, (error, user) => {
    //     if(error){
    //         return console.log('unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({Age: 27}).toArray((error, user) => {
    //     if(error){
    //         return console.log('unable to fetch data')
    //     }
        
    //     console.log(user)
    // })




    //this collection method helps us to track all of the things we do
    //inserts one user
    // db.collection('users').insertOne({
    //     _id: id,
    //     Name: 'Jensen',
    //     Age: 99
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.insertedId)
    // })

    // db.collection('users').insertMany([
    //     {
    //         Name: 'Eugene',
    //         Age: 27
    //     }, {
    //         Name: 'Valantia',
    //         Age: '26'
    //     }
    // ],(error, result) => {
    //     if(error){
    //         return console.log('unable to insert users')
    //     }
    //     console.log(result.insertedIds)

    // })


    db.collection('loginIDs').insertMany([
        {
            id: 'eugenektky',
            password: 'uwa2pxf5'
        },{
            id: 'poofybunny',
            password: 'uwa2pxf5'
        },{
            id: 'gigas234',
            password: 'uwa2pxf5'
        }
    ], (error, result)=>{
        if(error){
            return console.log('unable to insert users')
        }

        console.log(result.insertedIds)
    })
    console.log('Successful connection!')
})