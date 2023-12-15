const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("DB Connected!")
}).catch((error) => {
    console.log("DB connection error: " + error)
})