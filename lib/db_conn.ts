import * as mongoose from 'mongoose';

//Set up default mongoose connection
mongoose.connect(process.env.dbURI,
    {
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

//Get the default connection
var db = mongoose.connection;

db.on('connected', () => (console.log('mongodb connected successfully')));
//Bind connection to error event (to get notification of connection errors)
db.on('disconnected', console.error.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));