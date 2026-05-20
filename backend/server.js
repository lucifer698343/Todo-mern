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

app.use(cors({
    origin: 'https://todo-mern-frontend-4mkv.onrender.com',
    credentials: true
}));

//connect db
connectDB();

app.get('/', (req, res) => {
    res.send('Backend is running');
});

//routes
app.use('/auth',authRoutes);
app.use('/todo',todoRoutes);
app.use('/admin', adminRoutes);

//uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//error middleware
app.use(errorMiddleware);

//starting the server
app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})
