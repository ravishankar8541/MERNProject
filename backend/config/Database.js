const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Database Connected Successfully")
}).catch((error) => {
    console.log("Database Connection Failed")
    console.log(error);
    process.exit(1)
})