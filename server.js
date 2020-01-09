const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path=require('path');
//Connect Database
connectDB(); 
//Init middleware
app.use(express.json({extended:false})); // allows data into "request.body"


//app.get('/',(req,res)=> res.send('API is running'));

//Defining routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));

//Serve static assets in production
if(process.env.NODE_ENV==="production"){
    //Set Static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}
// To access environment variable set, mainly used while Horuku. But local instance port is 5000
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Started started on port ${PORT}`));