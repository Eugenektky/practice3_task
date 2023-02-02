require('../src/database/mongoose')
const User = require('../src/models/users') 


// User.findByIdAndUpdate('63cb4e47d81efafa881e6d27', { age: 77 }).then((newUser) => {
//     console.log(newUser)
//     return User.countDocuments({ age:77 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async(id, age, email) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const deleteUser = await User.deleteMany({email})
    const count = await User.countDocuments({age})
    return count
}


updateAgeAndCount('63cb4e47d81efafa881e6d27', 0, 'eugenetan1803@gmail.com').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

