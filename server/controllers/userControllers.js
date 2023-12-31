import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../config/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please Enter all the Feilds");
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		const token = await generateToken(user._id);
		res
			.status(201)
			.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token,
			})
			.cookie("token", token);
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

const userAuth = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		const token = await generateToken(user._id);
		res
			.status(201)
			.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token,
			})
			.cookie("token", token);
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});
export { registerUser, userAuth };
