require('dotenv').config();
const express=require('express')
const connectDB=require('./config/db')
const authRoutes=require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorMiddleware=require('./middleware/errorMiddleware')
const cors = require('cors');
const path = require('path');
const app=express();

//middleware
app.use(express.json());
app.use(cors());

//connect db
connectDB();

//routes
app.use('/auth',authRoutes);
app.use('/todo',todoRoutes);
app.use('/admin', adminRoutes);

//error middleware
app.use(errorMiddleware);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//starting the server
app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})