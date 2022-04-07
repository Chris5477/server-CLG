const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			throw new Error("Token is missing in header");
		}
		const token = req.headers.authorization.split("Bearer")[1].trim();
		const decodedToken = jwt.verify(token, "RANDOM_KEY_SECRET_APPLICATION_COVERLETTER");
		const userID = decodedToken.userId;
		req.auth = { ...userID };

		return next();
	} catch (error) {
		res.status(401).json({ message: error });
	}
};
