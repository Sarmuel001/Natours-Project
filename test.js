const express = require('express');
const fs = require('fs');
const server = require('http');


const user = (pop)=> {JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/users.json`));
}



exports.checkEx = (req, res, next, val) =>{
    if(!req.params.id){
        return res.status(400).json({
            status: 'fail',
            message: 'Error message'
        })
    }
    next();
}

exports.checkHeader = (req, res, next, val)=>{
    if(!req.params.name || !req.params.price){
        return res.status(404).json({
            status: 'fail',
            message:'error message'
        });
    }
    next();
}

exports.getAll = (req, res)=>{  // /api/v1/users
    res.status(200).json({
        status: 'success',
        message: 'Get all tours successfully',
        data: {
            user 
        }
    })
}
exports.getOne = (req, res)=>{ // /api/v1/users/id
    const getUser = req.params.getUser*1;
    console.log(req.params.newUser)
    const userOne =  user.find(profile => profile.getUser === getUser)
    res.status(200).json({
        status: 'success',
        message: 'Get a user successfully',
        data: {
           users: userOne
        }
    })
}

exports.createUser = (req, res) =>{
 const newId = tours[tours.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);

  user.push(newUser);
  

  fs.writeFileSync(`${__dirname}./server.js`, JSON.stringify(user),err=>{
      res.status(200).JSON({
          status: 'success',
          data:{
              users: newUser
            }
        });
    } );
}

exports.deleteUser = (req, res)=>{
    res.status(200).json({
        status:'sucess',
        data:'null'
    })
}