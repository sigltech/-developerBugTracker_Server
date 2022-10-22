require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        return console.log('Connected to MongoDB');
    }
});

// set port
const port = process.env.PORT || 5050;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// routes
app.use('/api/auth', require('./Controller/Routes/auth'));
app.use('/api/tickets', require('./Controller/Routes/tickets'));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 
