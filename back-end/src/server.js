const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserController = require('./controllers/UserController')
const LoginController = require('./controllers/LoginController')
const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.get('/',UserController.getAllUsers)

app.post('/register', UserController.store)
app.post('/login', LoginController.store)

try{
    mongoose.connect(process.env.MONGO_DB_CONNECTION,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })

}catch(err){
    console.log(err)
}



app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})