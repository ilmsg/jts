const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongodb_uri = process.env.MONGODB_URI;
const mongodb_options = {};

console.log('mongodb_uri:', mongodb_uri);

const run = async () => {
    await mongoose.connect(mongodb_uri, mongodb_options);
    mongoose.connection.on('error', (err) => { console.log(err) });
    mongoose.connection.on('open', (ref) => { console.log('Connected: ' + mongodb_uri) })
    mongoose.connection.on('disconnected', () => { console.log('disconnected.') });
}

run().catch(e => console.log(e.message));