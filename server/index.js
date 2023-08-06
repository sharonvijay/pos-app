import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import planRoutes from "./routes/planRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

app.locals.stripe = stripe;

const PORT = process.env.PORT;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on Port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error(`Failed to connect to MongoDB: ${error.message}`);
		process.exit(1);
	});
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/plan", planRoutes);

app.get("/config", (req, res) => {
	res.send({
		publishableKey: process.env.STRIPE_PRIVATE_KEY,
	});
});

app.post("/api/subscribe", async (req, res) => {
	const { name, email, paymentMethod } = req.body;
	try {
		if (req.method != "POST") return res.status(400);
		const { name, email, paymentMethod } = req.body;
		// Create a customer
		const customer = await stripe.customers.create({
			email,
			name,
			payment_method: paymentMethod,
			invoice_settings: { default_payment_method: paymentMethod },
		});
		// Create a product
		const product = await stripe.products.create({
			name: "Monthly subscription",
		});
		// Create a subscription
		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			items: [
				{
					price_data: {
						currency: "INR",
						product: product.id,
						unit_amount: "500",
						recurring: {
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
		// Send back the client secret for payment
		res.json({
			message: "Subscription successfully initiated",
			clientSecret: subscription.latest_invoice.payment_intent.client_secret,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});
