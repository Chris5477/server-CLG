const User = require("../models/User");
const bcrypt = require("bcrypt");

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
