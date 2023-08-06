import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
	name: { type: String, required: true },
	billing: { type: String, required: true, enum: ["Monthly", "Yearly"] },
	price: { type: Number, required: true },
	videoQuality: { type: String, required: true },
	resolution: { type: String, required: true },
	devices: { type: String, required: true },
});

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
