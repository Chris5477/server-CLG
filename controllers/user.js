const User = require("../models/User");
const bcrypt = require("bcrypt");
const { json } = require("express/lib/response");

exports.createUser = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				pseudo: req.body.pseudo,
				password: hash,
			});
			user
				.save()
				.then(() => res.status(201).json({ message: "user created with success" }))
				.catch(() => res.status(400).json({ message: "Create user failed" }));
		})

		.catch(() => res.status(500).json(new Error("Error servor")));
};

exports.login = (req, res, next) => {
	User.findOne({ pseudo: req.body.pseudo })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ message: "Pseudo incorrect !" });
			}
			bcrypt.compare(req.body.password, user.password).then((valid) => {
				if (!valid) {
					return res.status(400).json({ message: "Password incorrect !" });
				}

				res.status(200).json({ userId: user.id });
			});
		})
		.catch(() => res.status(500).json({ message: "Error server" }));
};

exports.deleteUser = (req, res, next) => {
	User.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: "User deleted with success !" }))
		.catch(() => res.status(400).json({ message: "Unable to delete your account !" }));
};

exports.addCard = (req, res, next) => {
	const card = {...req.body}
	User.updateOne({_id : req.params.id}, {$push : {cards : card} })
	.then(() => res.status(201).json({message : "Data added"}))
	.catch(() => res.status(400).json({message : "Unable to add your data !"})) 
	next()
};
