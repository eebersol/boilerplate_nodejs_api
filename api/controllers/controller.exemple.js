'use strict'

const modelExemple 	= require('../models/model.exemple.js');
const customError 	= require('../modules/customError');

module.exports = {
	get: async (req, res, next) => {
		try {
			let data = await modelExemple.find();
			res.status(200).json(data);
		} catch (err) {
			// console.log("Error get: " + err)
			next(new customError(err.message, 400))
		}
	},
	getBy: async (req, res, next) => {
		try {
			let data = await modelExemple.find({_id: req.params.id});
			res.status(200).json(data);
		} catch (err) {
			// console.log("Error getBy: " + err)
			next(new customError(err.message, 400))
		}
	},
	post: async (req, res, next) => {
		try {
			let data = await modelExemple.create(req.body)
			data = await modelExemple.findOneAndUpdate({_id : data._id}, {new: true})
			res.status(200).json(data)
		} catch (err) {
			// console.log("ERROR post: " + err)
			next(new customError(err.message, 400))
		}
	},
	putBy: async (req, res, next) => {
		try {
			let data = await modelExemple.updateOne({_id: req.params.id}, req.body, {new: true})
			res.status(200).json(data)
		} catch (err) {
			console.log(" ERROR putBy: ", err);
			next(new customError(err.message, 400))
		}
	},
	deleteBy: async (req, res, next) => {
		try {		
			let del = await modelExemple.deleteOne({_id: req.params.id });
			if (del.n === 0)
				throw new Error('you are not authorize to del this document')
			res.status(204).send();
		} catch (err) {
			// console.log("deleteBy: ", err)
			next(new customError(err.message, 400))
		}
	}
};