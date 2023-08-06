import asyncHandler from "express-async-handler";
import MonthPlan from "../models/monthPlan.js";
import YearPlan from "../models/yearPlan.js";
const plandata = asyncHandler(async (req, res) => {
	const { planName, billingCycle } = req.query;

	try {
		console.log(
			"Fetching plan data for:",
			planName,
			"Billing Cycle:",
			billingCycle
		);

		let planData;
		if (billingCycle === "Monthly") {
			planData = await MonthPlan.findOne({ name: planName });
		} else if (billingCycle === "Yearly") {
			planData = await YearPlan.findOne({ name: planName });
		}

		console.log("Fetched plan data:", planData);

		if (!planData) {
			console.log("Plan not found");
			return res.status(404).json({ message: "Plan not found" });
		}

		const devicesArray = planData.devices.split("+");
		planData.devices = devicesArray;

		console.log("Sending plan data in response:", planData);

		res.json(planData);
	} catch (error) {
		console.error("Error fetching plan data:", error);
		res.status(500).json({ error: "Failed to fetch plan data" });
	}
});

export { plandata };
