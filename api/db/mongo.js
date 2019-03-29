const mongoose  = require('mongoose');

/* FOR DOCKER */
const mongoDB   = 'mongodb://mongo:27017/db_name';
/*  DEFAULT */
// const mongoDB   = 'mongodb://127.0.0.1:27017/db_name';

mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useCreateIndex: true
});

/*
Ajouter pour silent le warning : 

(node:8656) DeprecationWarning: collection.findAndModify is deprecated. 
Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.

La méthode findOneAndUpdate call method findAndModify
*/
mongoose.set('useFindAndModify', false)


mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

