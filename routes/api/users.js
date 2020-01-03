const express=require('express');
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt=require('jsonwebtoken');
const { check,validationResult}=require('express-validator');
var User=require('../../models/User');

//POST api/users  @route
//Register User @desc
// Public @access
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include valid email address').isEmail(),
    check('password','Enter password with 6 or more characters').isLength({
        min:6
    })
],async (req,res)=> {
    console.log(req.body); //refer to init in server.js -> bodyparser
    const er=validationResult(req);
    if(!er.isEmpty()){
        return res.status(400).json({
            errors:er.array()
        });
    }
    const {name,email,password}=req.body;
    try{
        //See if user already exists
        let user=await User.findOne({ email});
        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
        }
    
    //Get users gravatar
    const avatar=gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    })
    // Just creates new user instance
    user=new User({
        name,
        email,avatar,
        password
    });

    //Encrypt password
    const salt=await bcrypt.genSalt(10);

    user.password=await bcrypt.hash(password,salt);
    await user.save();
    
    //Return jsonwebtoken
    const payload={
        user:{
            id:user.id
        }
    }

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 3600},
            (err,token) => {
             if(err) throw err;
             res.json({ token });   
            }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }   
});

module.exports=router;