const express = require('express');
const mongoose = require('mongoose');

const loginRoute = express.Router();


loginRoute

// check if username and password exist
.get('/',(req,res) => {
    req.body.username
    Model.find({username : req.body.username})
    .then((result) => {
        if(result.length != 0){
            if(result.password === req.body.password){
                res.json({success : true, token : "send token"})
            }
            else{
                res.json({success : false})
            }
        }
        else{
            res.json({success : undefined})
        }
    })
    .catch(err => console.log(err));
})


.post('/signup', (req,res) => {
    Model.find({username : req.body.username})
    .then((result) => {
        if(result.length != 0){
            Model.create(req.body)
            .then((result) => {
                res.json({success : true})
            })
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err));
})