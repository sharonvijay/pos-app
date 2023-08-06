import mongoose from "mongoose";

const monthplanSchema = new mongoose.Schema({
	name: { type: String, required: true },
	payid: { type: String },
	price: { type: Number, required: true },
	priceid: { type: String },
	quality: { type: Number, required: true },
	resolution: { type: Number, required: true },
	devices: [{ type: String, required: true }],
});

const MonthPlan = mongoose.model("Monthplan", monthplanSchema);

export default MonthPlan;
