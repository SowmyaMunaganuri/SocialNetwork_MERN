const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
var User=require('../../models/User');
const auth=require('../../middleware/auth');
const config=require('config');
const jwt=require('jsonwebtoken');
const { check,validationResult}=require('express-validator');

//GET api/auth  @route
//Test Route @desc
// Public @access
router.get('/',auth,async (req,res)=> {
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//POST api/auth  @route
//Authenticate User and get token @desc
//Public @access
router.post('/',[
    check('email','Please include valid email address').isEmail(),
    check('password','Password is required').exists()],
    async (req,res)=> {
    console.log(req.body); //refer to init in server.js -> bodyparser
    const er=validationResult(req);
    if(!er.isEmpty()){
        return res.status(400).json({
            errors:er.array()
        });
    }
    const {email,password}=req.body;
    try{
        //See if user already exists
        let user=await User.findOne({ email});
        if(!user){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]});
        }
    
    //Return jsonwebtocken
    const payload={
        user:{
            id:user.id
        }
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]});
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