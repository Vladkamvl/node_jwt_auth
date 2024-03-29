require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const sequelize = require('./db/connection')
const models = require('./models')

const router = require('./router')
const errorMiddleware = require('./middlewares/ErrorMiddleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`server started on ${PORT}...`))
    }catch (e){
        console.log(e)
    }
}
start()