import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'

// console.log(nanoid());

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000

let userBase = [];

app.post('/signup', (req, res) => {
  
    let body = req.body;

    if(!body.fname || !body.lname || !body.email || !body.password){

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

    let isFound = false;

    for(let i = 0; i < userBase.length; i++){
   
         if(userBase[i].email === body.email.toLowerCase()){
            isFound = true
            break;
         }      

    }

    if(isFound){
        res.status(400).send({ message : 'This Email id is Already Registered'})
    }

   
    let newUsers = {
        userId : nanoid(),
        fname : body.fname,
        lname : body.lname,
        email : body.email.toLowerCase(),
        password : body.password,
    }


   



    userBase.push(newUsers);

    res.status(201).send( {message : 'User is Created'})

})




app.post('/login', (req,res) => {

    let body = req.body

     if(!body.email || !body.password){

        res.status(400).send(`required all fields,for example
        
          {
               email : "john@abc@.com",
               password : "1234"
          }`)
          return;
     }


      let isFound = false;

   for(let i = 0; i < userBase.length; i++){

      if(userBase[i].email === body.email){

        isFound = true
         if(userBase[i].password === body.password){

             res.status(201).send(
                {
                     fname : body.fname,
                     lname : body.lname,
                     email : body.email.toLowerCase(),
                     message : 'Login Successful'
                })
                return;

         }else{
            res.status(404).send({message : 'The email address or password you entered is \n\'t connected to an account. Find your account and log in.'})
            
         }
         return;
        
        }
}



if(!isFound){
    res.status(404).send({message : 'The email address or password you entered is \n\'t Registered'})
    return;

}

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})