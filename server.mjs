import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'
import mongoose from 'mongoose'

// console.log(nanoid());



const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    createdOn: {type: Date , default: Date.now}
  });

const userModel = mongoose.model('user', userSchema);



app.post('/signup', (req, res) => {

    let body = req.body;

    if (!body.fname || !body.lname || !body.email || !body.password) {

        res.status(400).send(`required all fields, for example
        
          {
            fname = "john",
            lname = "doe",
            email = "john@abc.com",
            password = "1234",
          }

        
        `)
        return;
    }

   

    let newUsers = new userModel ({
        fname: body.fname,
        lname: body.lname,
        email: body.email.toLowerCase(),
        password: body.password,
    })
    
    newUsers.save((err,result) => {
  
         if(!err){
            console.log("db result : " , result);
            res.status(201).send({ message: 'User is Created' })
        }else{
            console.log("db error : " , err );
            res.status(500).send({ message: 'internal server error' })

        }
         
    })







})




app.post('/login', (req, res) => {

    let body = req.body

    if (!body.email || !body.password) {

        res.status(400).send(`required all fields,for example
        
          {
               email : "john@abc@.com",
               password : "1234"
          }`)
        return;
    }


    let isFound = false;

    for (let i = 0; i < userBase.length; i++) {

        if (userBase[i].email === body.email) {

            isFound = true
            if (userBase[i].password === body.password) {

                res.status(201).send(
                    {
                        fname: body.fname,
                        lname: body.lname,
                        email: body.email.toLowerCase(),
                        message: 'Login Successful'
                    })
                return;

            } else {
                res.status(404).send({ message: 'User not Found' })

            }
            return;

        }
    }



    if (!isFound) {
        res.status(404).send({ message: 'The email address or password you entered is \n\'t connected to an account. Find your account and log in.' })
        return;

    }

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


let dbURI = 'mongodb+srv://abc:abc@cluster0.ocswaiz.mongodb.net/socialMediaBase?retryWrites=true&w=majority';
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});