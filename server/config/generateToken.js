import jwt from "jsonwebtoken";

const generateToken = async (id) => {
	return jwt.sign({ id }, "SHARONVIJAYSHARONVIJAYSHARONVIJAYTT", {
		expiresIn: "3h",
	});
};

export default generateToken;
