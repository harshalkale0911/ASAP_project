if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config()
}

const express = require('express')
const connectDataBase = require('./DB/database.js')
const User = require('./Model/UserModel.js')
const mongoose = require('mongoose')
const cors = require("cors")
const { getDB, mongoConnection } = require('./DB/mongo-client.js')
const router = require('./Routes/route.js')
const SQLRouter=require('./Routes/SQL.Route.js')
const cookieParser=require('cookie-parser')

const app = express();
const PORT = 3000
app.use(express.json())
app.use(cors());
app.use(cookieParser())

app.use('/CRUD-operation', router)
app.use('/mysql',SQLRouter)


app.get('/ping', (req, res) => {
    return res.send('pong')
})

app.get('/', async (req, res) => {
    const checkStatus = await mongoConnection.connect();
    const readyState = mongoConnection.topology.isConnected()
        ? 'connected'
        : 'disconnected';
    res.send({ readyState })

})

app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    res.cookie('username', username, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.json({ message: 'Login successful' });
});


app.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.json({ message: 'Logout successful' });
});


app.listen(PORT, async () => {
    connectDataBase()
    console.log(`server is running on http://localhost:${PORT}`)


})


