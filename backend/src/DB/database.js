// if(process.env.NODE_ENV!=='PRODUCTION'){
//     const dotenv=require('dotenv')
// }
const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
const DB=process.env.DB_URL

const connectDB=async()=>{
    mongoose
        .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`Database is connected successfully: ${data.connection.host}`)
        })
        .catch((err) => {
            console.log('Database connection failed..', err.message)
            
        })

}

module.exports=connectDB;