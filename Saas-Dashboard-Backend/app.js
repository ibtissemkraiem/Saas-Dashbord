const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const userRoute = require('./routes/userRoute');
const cors = require('cors');


require('dotenv').config(); // To load .env variables

const app = express();
app.use(express.json());
// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:4200'  
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the SaaS Dashboard API');
});


//Use the authentication Route 
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes); 
app.use('/api/users', userRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
