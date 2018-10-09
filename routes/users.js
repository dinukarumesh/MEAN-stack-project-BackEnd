const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
var base64 = require('base-64');
var multer = require('multer');
var path = require('path');
const bodyParser = require('body-parser');

var  fs =require('fs');

var userArray = [];

// Register
router.post('/register', (req, res, next) => {
  console.log('in the register');
  let newUser = new User({
    employeeId: req.body.employeeId,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    userRole: req.body.userRole
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
});
var user_1= {
  id_1:''
}
// get register detail to profile page
router.post('/getregisterdetail',function(req,res){
console.log('in the api');
 var  userid =req.body.userid;
console.log(userid);
  User.findById({_id:userid},'employeeId email username address',function(err,user){


    if(err){

      console.log(' error get register detail');
    }else{

      res.json({
        user:user
      });
    }
  });


});


router.post('/submitedit',function(req,res){
  console.log('in the submit edi api');

  var userid =req.body.userid;
  var name =req.body.name;
  var employeeid =req.body.employeeid;
  var email =req.body.email;
  var address =req.body.address;

  User.findByIdAndUpdate({_id:userid},{$set: {
      'employeeId':employeeid,
      'address':address,
      'username':name,
      'email':email

  }},function(err,user){

    if(err){
      console.log('error submit detail');
    }else{
      res.json({

        msg:'sucees  submit edit'
      });
      console.log('succes submit detil');
    }
  });
});



// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  const password = req.body.password;
  console.log(password);

  if (!email || !password) {
    console.log('all feilds are filled');
    res.statusCode = 404;
    res.json({
      "status": "not found error",
      "message": "some feild are not filled"
    });

  } else {

    User.getUserByEmail(email, (err, user) => {
      console.log(user);
      if (err) throw err;
      if (!user) {
        return res.json({ success: false, msg: 'User not found' });
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({ data: user }, config.secret, {
            expiresIn: 60480 // 1 day

          });


          
          // console.log(this.user.id);
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              employeeId: user.employeeId,
              username: user.username,
              email: user.email,
              userRole: user.userRole
            }
          });
       user_1.id_1 = user._id;
          console.log(user_1.id_1 );
        } else {
          return res.json({ success: false, msg: 'Wrong password' });
        }
      });

    });
  }
});

var storage = multer.diskStorage({

      destination: function (req, file, cb) {

          cb(null, './routes/picture/');

          //console.log(file);

      }, 
        filename: function (req, file, cb) {

        cb(null, file.originalname);

        //console.log('origina'+file.originalname);

        var path1 =   './routes/picture/' + file.originalname;
        path2=path1;

       //console.log('path hii'+path2);

      }

    });

var upload = multer({ storage: storage });





        function base64_encode(file) {  //read imge file

        // read binary data

       // console.log(file);

        var bitmap = fs.readFileSync(file);

        // convert binary data to base64 encoded string

        return new Buffer(bitmap).toString('base64');

        }




        router.post('/getProfilePicture',function(req,res){
          
            console.log('in the get apofile picture api');
          
            User.findById(req.body.userId,function(err,user){
          
          
          
                      if(err){
          
                          console.log('get profile picture err');
          
                          statusCode=404;
          
                          res.json({
          
                            success:true,
          
                            "status": "unsuccess",
          
                            "message": "not find profile picture",
          
                          });
        
                      }else if(user.profilePictureUrl==undefined){
          
                        console.log('1st user');
          
                        res.statusCode =404;
          
                        res.json({
          
                          photodata:'',
          
                          success:false
          
                        });
          
                      }else {
          
                        console.log('not gettin err on get profile picture');
          
          
          
                        var base64str = base64_encode(user.profilePictureUrl);
          
          
          
                                    
          
                              res.statusCode = 200;
          
                              res.json({
          
                                  success:true,
          
                                "status": "success",
          
                                "message": "fourd profile picture",
          
                                
          
                                photodata: base64str
          
                                
          
                              });
          
                      }
          
          
          
            })
          
          
          
          });





// Profile
router.post('/uploadpofilepicture',upload.array("uploads[]", 12),function(req, res)  {
  console.log('in the api');
  console.log(user_1.id_1 );
  var userId = req.body.userId;
  console.log(userId);
 
  
     console.log('path'+path2);
  
     
  
  
  
      var newUser =new User();
  
      if(path2!=null){
  
              
  
              newUser.url=path2;
  
        
  
      
  
              User.findOneAndUpdate({_id:userId}, {$set: {'profilePictureUrl':path2}},function(err,result){
  
                  if(err){
  
                  // console.log(err);
  
                  res.sendStatus=500;
  
                  res.json(
  
                  {
  
                      success:false,
  
                      "status": "err",
  
                       "message": "User not successfully created",
  
                  });
  
      
  
      }else{
  
        res.statusCode =200;
  
        console.log('saved');
  
      
  
      
  
      
  
        User.findOne({'profilePictureUrl':path2},function(err,photo){
  
        
  
              if(err){
  
          res.statusCode = 404;
  
          res.json({
  
              success:false,
  
            "status": "error",
  
            "message": "404 Not Found"
  
          });
  
          console.log('photo err');
  
        } else{
  
          console.log('photo is '+ photo);
  
      var base64str = base64_encode(photo.profilePictureUrl);
  
   //   console.log(base64str);
  
          res.statusCode = 200;
  
          res.json({
  
              success:true,
  
            "status": "success",
  
            "message": "fourd profile picture",
  
            
  
            photodata: base64str
  
            
  
          });
  
        }
  
      });
  
      }
  
      });
  
      }else{
  
      console.log('path null');
  
      
  
      }
  
     


});

// Get All users
router.get('/getUsers', function(request, response){
  console.log('show all users');
  User.find({}).exec(function(err, User){
    if(err){
      console.log("error retriving users");
    }else{
      response.json(User);
    }
  });
});


//update
router.put('/setRole/:id', function (req, res) {
  console.log('set userRole');
  User.findByIdAndUpdate(req.params.id,
    {
      $set: { userRole: req.body.userRole }
    },
    {
      new: true
    },
    function (err, updatedUser) {
      if (err) {
        res.send("Error setting Role");
      } else {
        res.json(updatedUser);
      }
    }
  );
});

module.exports = router;
