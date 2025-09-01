const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { getDB } = require('../DB/mongo-client.js')
const { ObjectId } = require('mongodb')
router.use(express.json());
const User=require('../Model/UserModel.js')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const JWT_SECRET=process.env.JWT_SECRET_KEY


router.get("/user", async (req, res) => {
    try {
        const token= req.cookies.token;

        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const decoded=jwt.verify(token,JWT_SECRET)
        const db = await getDB()
        const userData = await db.find().toArray()
        return res.status(200).send(userData)
    } catch (err) {
        if (err.name === "JsonWebTokenError" ) {
            return res.status(401).json({ message: "Invalid token" });
        }
        return res.status(500).json({ message: err.message })
    }
})
router.post("/create-user", async (req, res) => {
    console.log(req.body)
    try {
        const { name, age, description } = req.body
        if (!name || !age || !description) {
            return res.status(400).send({ message: 'All fields are required' })
        }
        if ( isNaN(Number(age))) {
            return res.status(400).send({ message: 'age should be in number' })
        }
        const db = await getDB();
        console.log(db)
        const insertData = await db.insertOne({name,age,description})
        return res.status(201).send({ message: "Data inserted successfully", insertData })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
router.delete("/delete/:id", async (req, res) => {
    try {
        const db = await getDB()
        const { id } = req.params
        const deleteUser = await db.deleteOne({ _id: new ObjectId(id) })
        return res.status(200).send({ message: 'deleted Successfully', deleteUser })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
router.put("/update/:id", async (req, res) => {
    try {
        const db = await getDB()
        const { id } = req.params
        // const objectId = new ObjectId(id)
        const updateduser = await db.updateOne({ _id: new ObjectId(id) }, { $set: req.body })
        return res.status(200).send({ message: "Updated Successfully", updateduser })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})



module.exports = router