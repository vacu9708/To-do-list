const express = require('express');
const router=express()
const service=require("../service/service.js")
const naver_OAuth=require("../service/naver_OAuth.js")
const multer = require('multer'); // For image uploading
const path=require('path')

const app=undefined
function init(app_){app=app_}

// storage for images
const storage = multer.diskStorage({
    // destination of file
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '..', '/uploads/images'));
    },
  
    // decide filename
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    }
})
  
// parameter for image upload
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
})

router.post('/signup', upload.single('profileImg'), service.sign_up)
router.post('/login', service.login)
router.get('/naver/OAuth/login', naver_OAuth.login)
router.get('/naver/OAuth/callback', naver_OAuth.callback)
router.get('/all_users', service.get_all_users)
router.get('/user', service.get_user)
router.patch('/user', upload.single('profileImg'), service.patch_user)
router.delete("/user", service.delete_user)
router.get('/todos', service.get_todos)
router.post('/todo', service.post_todo)
router.patch('/todoIsCompleted/:todoId', service.patch_is_completed)
router.patch('/todoTitle/:todoId', service.patch_todo_title)
router.delete("/todo/:todoId", service.delete_todo)
  
router.get('/*', function(req, res) { // Serve react index
    res.sendFile(path.join(__dirname, '../../client/build/index.html'), err=>{
        if (err) 
            res.status(500).send(err)
    })
})

module.exports = router;