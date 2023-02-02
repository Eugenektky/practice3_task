require('../src/database/mongoose')
const Task = require('../src/models/tasks')


// Task.findByIdAndUpdate('63cbe8187710dd3d3170ae2d', {description: 'Cleaning the house'}).then((results) => {
//     console.log(results)
//     return Task.deleteMany({ description: ' ' })
// }).then((taskLeft) => {
//     console.log(taskLeft)
//     return Task.countDocuments({completed: false})
// }).then((incompleted) =>{
//     console.log(incompleted)
// }).catch((e) => {
//     console.log(e)
// })


const deleteAndCount = async (completed) => {
    const taskLeft = await Task.deleteMany({completed})
    const count = await Task.countDocuments()
    return count
}

deleteAndCount('true').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})