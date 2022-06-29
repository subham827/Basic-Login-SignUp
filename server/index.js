const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/userdatabasefinals')



app.post('/api/register', async(req, res) => {
    console.log(req.body);
    try{
          await User.create(req.body);
          res.json({ status : "ok"})

        
    
        
       
    }
    catch(err){
        console.log(err);
        res.json({ status:'error', error:"Duplicate email"})
    }
    }) 
    app.post('/api/login', async (req,res)=>{
        try{
            const user = await User.findOne({email: req.body.email,
                password: req.body.password});
           if(user){
               console.log("ok");
                const token = jwt.sign({email: user.email}, 'secret')
            return res.json({status: 'ok', user: token})
           }
           else{
                console.log("not ok");

            return res.json({status: 'error', user: false})
           }
        }
        catch(err){
            res.send(err);

        }
    })
    app.get('/api/quote', async (req,res)=>{
        const token = req.headers['x-access-token'];
        try {
            const decoded = jwt.verify(token, 'secret');
            const email = decoded.email;
           const user =   await User.findOne({email: email});
            return res.json({status: 'ok', quote: user.quote});
        } catch (error) {
            console.log(error);
            return res.json({status: 'error', error:"Invalid token"});
            
        }
    })
    app.post('/api/quote', async (req,res)=>{
        const token = req.headers['x-access-token'];
        try {
            const decoded = jwt.verify(token, 'secret');
            const email = decoded.email;
             await User.updateOne({email: email}, {$set: {quote: req.body.quote}});
            return res.json({status: 'ok'});
        } catch (error) {
            console.log(error);
            return res.json({status: 'error', error:"Invalid token"});
            
        }
    })
app.listen(5000, () => console.log(`Server running on port `)) 
