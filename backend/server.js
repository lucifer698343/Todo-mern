require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();


// CREATE UPLOADS FOLDER AUTOMATICALLY
const uploadPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}


// MIDDLEWARE
app.use(express.json());

app.use(cors({
    origin: 'https://todo-mern-frontend-4mkv.onrender.com',
    credentials: true
}));


// CONNECT DATABASE
connectDB();


// ROOT ROUTE
app.get('/', (req, res) => {
    res.send('Backend is running');
});


// STATIC FOLDER
app.use('/uploads', express.static(uploadPath));


// ROUTES
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);
app.use('/admin', adminRoutes);


// ERROR MIDDLEWARE
app.use(errorMiddleware);


// START SERVER
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
