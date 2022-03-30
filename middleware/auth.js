const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "RANDOM_KEY_SECRET_APPLICATION_COVERLETTER");
		const userID = decodedToken.userId;
		req.auth = { ...userID };
		if (req.body.userId && req.body.userId !== userID) {
			throw "UserId not valable";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ message: error });
	}
};
