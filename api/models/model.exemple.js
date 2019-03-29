const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
 
const Exemple = new Schema({
	key_string: {
        	type: String, 
        	required: true
	},
	key_object: {
        	sub_key_number: { type: Number, required: true },
        	sub_key_string: { type: String, required: true }
    	},
	key_number: {
        	type: Number, 
        	default: 0
	},
	key_date: {
        	type: Date,
        	required: true
	},
	key_array: {
		type: Array
	},
	key_boolean:{
		type: Boolean
	}
}, { versionKey: false });

module.exports = mongoose.model('Exemple', Exemple);