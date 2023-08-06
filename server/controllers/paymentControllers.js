import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Plan from "../models/planModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const payment = asyncHandler(async (req, res) => {
	// const { amount, username, email, paymentMethod, billing } = req.body;
	const { username, email, paymentMethod } = req.body;

	try {
		const customer = await stripe.customers.create({
			email,
			name: username,
			payment_method: paymentMethod,
			invoice_settings: {
				default_payment_method: paymentMethod,
			},
		});

		const product = await stripe.products.create({
			name: "Plan Subscription",
		});

		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			items: [
				{
					price_data: {
						currency: "INR",
						product: product.id,
						unit_amount: "500",
						recurring: {
							// interval: billing,
							interval: "month",
						},
					},
				},
			],
			payment_settings: {
				payment_method_types: ["card"],
				save_default_payment_method: "on_subscription",
			},
			expand: ["latest_invoice.payment_intent"],
		});
		// const paymentIntent = await stripe.paymentIntents.create({
		// 	amount,
		// 	currency,
		// 	automatic_payment_methods: { enabled: true },
		// });

		res.status(200).json({
			message: "Subscription Successful",
			clientSecret: subscription.latest_invoice.payment_intent.client_secret,
			subscriptionId: subscription.id,
		});
	} catch (error) {
		console.error("Error creating payment intent:", error);
		res.status(500).json({ error: "Unable to create payment intent" });
	}
});

export { payment };
