import mongoose from "mongoose";

const monthplanSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	quality: { type: Number, required: true },
	resolution: { type: Number, required: true },
	devices: { type: Number, required: true },
});

const MonthPlan = mongoose.model("Monthplan", monthplanSchema);

export default MonthPlan;
