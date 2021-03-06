require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Server init
const app = express();

// Cors
app.use(cors());

// Body parser and read
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB connection
dbConnection();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/checkouts', require('./routes/checkouts'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/searchs', require('./routes/searchs'));


app.listen(process.env.PORT, () => {
    console.log('Servidor online en el puerto ' + process.env.PORT);
});