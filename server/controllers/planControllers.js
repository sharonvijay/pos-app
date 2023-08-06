import asyncHandler from "express-async-handler";
import MonthPlan from "../models/monthPlan.js";
import YearPlan from "../models/yearPlan.js";
const plandata = asyncHandler(async (req, res) => {
	const { planName, billingCycle } = req.query;

	try {
		let planData;
		if (billingCycle === "Monthly") {
			planData = await MonthPlan.findOne({ name: planName });
		} else if (billingCycle === "Yearly") {
			planData = await YearPlan.findOne({ name: planName });
		}
		if (!planData) {
			return res.status(404).json({ message: "Plan not found" });
		}
		res.json({
			name: planData.name,
			payid: planData.payid,
			price: planData.price,
			quality: planData.quality,
			resolution: planData.resolution,
			devices: planData.devices,
		});
	} catch (error) {
		console.error("Error fetching plan price:", error);
		res.status(500).json({ error: "Failed to fetch plan price" });
	}
});

export { plandata };
