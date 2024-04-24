const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const SignupModel = require('./models/signup')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://admin:admin@librarycluster.2ivqqok.mongodb.net/?retryWrites=true&w=majority&appName=LibraryCluster")

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    SignupModel.findOne({email:email})
    .then(user=> {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else{
                res.json("Incorrect Password")
            }
        } else{
            res.json("Record does not exist")
        }
    })
})

app.post('/register', (req, res) => {
    SignupModel.create(req.body)
    .then(signup => res.json(signup))
    .catch(err => res.json(err))
})

app.listen(3001, ()=> {
    console.log("server is running")
})