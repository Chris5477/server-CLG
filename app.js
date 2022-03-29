const express = require("express");
const { json } = require("express/lib/response");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");

const databaseUrl = process.env.DATABASE_URL || "mongodb://localhost/coverletter";

mongoose
	.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connect to MongoDB success"))
	.catch(() => console.log("Connect to MongoDB FAILED :("));

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use("/api/v1/user", userRouter);
module.exports = app;
