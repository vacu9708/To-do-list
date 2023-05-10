const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const User = require('../models/User');
const bcrypt = require('bcrypt'); // For encryption
const fs = require('fs'); // To delete files
const path=require('path')

const sign_up= (req, res) => {
  const newUser = new User({ // New document
    userID: req.body.userID,
    password: bcrypt.hashSync(req.body.password, 10), // Encryption
    name: req.body.name,
    img: req.file? '/uploads/images/'+req.file.filename: ''
  });

  newUser.save(err => {
    if (err) { // Duplicate not allowed
      return res.status(409).json({error: 'ID already in use'})
    }

    return res.status(200).json({title: 'User successfully added'})
  })
}

const login= (req,res) => {
  User.findOne({userID: req.body.userID})
  .then(user=>{
    if (!user)
      return res.status(401).json({error: 'Invalid username!!'})
    if (!bcrypt.compareSync(req.body.password, user.password))
      return res.status(401).json({error: 'Invalid password'})

    // Authentication is done, give a token
    let token = jwt.sign({ userID: user.userID}, 'secretkey');
    //console.log(token)
    res.status(200).json({
      token: token
      //name: user.name
    })
  })
  .catch(err=>{
    if (err) 
      return res.status(404).json({error: err})
  })
}

const get_user= (req, res) => {
  jwt.verify(req.headers.token, 'secretkey', async(err, decoded) => {
    if (err) 
      return res.status(401).json({
          error: 'Not authorized'
      })

    // Now token is proved to be valid
    try{
    const user = await User.findOne({ userID: decoded.userID })
      return res.status(200).json({
          name: user.name,
          profileImg: user.img
      })
    } catch{
      throw err
    }
  })
}

const get_all_users = (req, res)=>{
  User.find({}, (err, users) => {
    if (err) 
      return res.status(401).json({error: err})

    return res.status(200).json({
      title: 'success',
      users: users
    })
  })
}

const delete_user=(req, res) => { // Delete a to-do
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
    if (err) // Token error
      return res.status(401).json({error: 'Not authorized'});

    User.deleteOne({userID: decoded.userID}, async (err, info)=>{
      if (err) 
        return res.status(404).json({error: err})
      if (!info.n)
        return res.status(401).json({error: 'Invalid username'})
      
      await Todo.deleteMany({author: decoded.userID})
      return res.status(200).json({title: 'success'})
    })
  })
}

const patch_user= (req, res)=>{ // Editing profile
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) =>{
    if (err)
      return res.status(401).json({error: 'Not authorized'})
    User.findOne({userID: decoded.userID})
    .then(user=>{
      user.name=req.body.nameToChange
      if(req.file){ // If there's a new profile image
        fs.unlink(path.join(__dirname, '..', user.img), err => { // Delete the previous profile image
          if(err)
            return res.status(500).json({error: 'file error'})
        })
        user.img='/uploads/images/'+req.file.filename // New profile image
      }

      user.save(err =>{
        if (err)
          return res.status(500).json({error: 'Save error'})
        return res.status(200).send('success')
      })
    })
    .catch(err=>{res.status(500).json({error: JSON.stringify(err)})})
  })
}

const get_todos = (req, res) => {
  jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
      if (err) 
      return res.status(401).json({
          error: 'Not authorized'
      })
      //Now token is proved to be valid
      Todo.find({ author: decoded.userID }, (err, todos) => {
        if (err)
          return res.status(404).json({error: err})
        
        return res.status(200).json({todos: todos})
      })
  })
}

const post_todo= (req, res) => {
  // verify
  jwt.verify(req.headers.token, 'secretkey', async (err, decoded) => {
    if (err)
      return res.status(401).json({
        error: JSON.stringify(err)
    });

    let newTodo = new Todo({
      title: req.body.title,
      isCompleted: false,
      author: decoded.userID
    });
    //console.log(newTodo._id)

    newTodo.save(err => {
      if (err) 
        return res.status(500).json({error: JSON.stringify(err)})
        // return res.status(200).end()
        // console.log(newTodo)
        return res.status(200).json({todo: newTodo})
    })
  })

    //Putting to-do in the user collection
    // let new_todo={
    //   title: req.body.title,
    //   isCompleted: false
    // }
    // User.updateOne({_id: decoded._id}, {$push: {todos: new_todo}}, (err, user)=>{
    //   if(err)
    //     return res.status(201).json({error: err})
        
    //   return res.status(200).json({todo: {$slice: ["$todos", -1]}})
    // })
}

const patch_is_completed= (req, res) => { // Update isComplete
  jwt.verify(req.headers.token, 'secretkey', async (err, decoded) => {
    if (err)
      return res.status(401).json({error: 'Not authorized'})

    // Now token is proved to be vaild
    Todo.findOne({ author: decoded.userID, _id: req.params.todoId }, (err, todo) => {
      if (err) 
        return res.status(404).json({error: err})
      
      todo.isCompleted = !todo.isCompleted

      todo.save(err => {
        if (err) 
          return res.status(500).json({error: err})

        return res.status(200).json({title: 'success'})
      })
    })
  })
}

const patch_todo_title= (req, res) => { // Update isComplete
  jwt.verify(req.headers.token, 'secretkey', async (err, decoded) => {
    if (err)
      return res.status(401).json({
      error: 'not authorized'
    });

    // Now token is proved to be vaild
    Todo.findOne({ author: decoded.userID, _id: req.params.todoId }, (err, todo) => {
      if (err) 
        return res.status(404).json({error: err})
      
      todo.title = req.body.newTitle

      todo.save(err => {
        if (err) 
          return res.status(500).json({error: err})

        return res.status(200).json({
          title: 'success'
        })
      })
    })
  })
}

const delete_todo= (req, res) => { // Delete a to-do
  jwt.verify(req.headers.token, 'secretkey', async (err, decoded) => {
    if (err) // Token error
      return res.status(401).json({error: 'Not authorized'});

    Todo.findByIdAndDelete(req.params.todoId, async(err, todo)=>{
      if (err) 
        return res.status(404).json({error: err})
      
      return res.status(200).json({title: 'success'})
    })
  })
}

module.exports = {
    sign_up: sign_up,
    login: login,
    get_todos: get_todos,
    get_all_users: get_all_users,
    get_user: get_user,
    patch_user: patch_user,
    delete_user: delete_user,
    post_todo: post_todo,
    patch_todo_title: patch_todo_title,
    patch_is_completed: patch_is_completed,
    patch_todo_title: patch_todo_title,
    delete_todo: delete_todo
}