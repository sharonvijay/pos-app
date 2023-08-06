import mongoose from "mongoose";

const yearplanSchema = new mongoose.Schema({
	name: { type: String, required: true },
	payid: { type: String },
	price: { type: Number, required: true },
	quality: { type: Number, required: true },
	resolution: { type: Number, required: true },
	devices: { type: Number, required: true },
});

const YearPlan = mongoose.model("Yearplan", yearplanSchema);

export default YearPlan;
