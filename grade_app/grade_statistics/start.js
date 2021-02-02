//require('dotenv').config({ path: './database.env'});
require('dotenv').config();
const mongoose = require('mongoose');

console.log(process.env.DATABASE)
mongoose.connect(process.env.DATABASE, {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });

require('./models/grades.js');
const app = require('./app');
const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});