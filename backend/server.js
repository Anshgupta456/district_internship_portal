const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

// Optional CORS Configuration
const corsOptions = {
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
};

// Middleware
app.use(cors());  // Apply CORS middleware with options
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
})
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/InternJobPostRoutes');
const studentRoutes = require('./routes/studentRoutes');
const governmentRoutes = require('./routes/governmentRoutes');
const universityRoutes = require('./routes/universityRoutes');

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/internjobposts', jobRoutes);
app.use('/api/government', governmentRoutes);
app.use('/api/universities', universityRoutes);

// Database connection
mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
