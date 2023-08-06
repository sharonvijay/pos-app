import { useState, useEffect } from "react";
import {
	Box,
	Heading,
	Text,
	Stack,
	Table,
	Tr,
	Td,
	HStack,
	Button,
	Tbody,
} from "@chakra-ui/react";
import { CardElement, useStripe } from "@stripe/react-stripe-js";
// import { CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { UserState } from "../context/UserProvider";

const CardDetails = () => {
	// const [stripeError, setStripeError] = useState(null);
	const [loading, setLoading] = useState(false);
	const stripe = useStripe();

	const { billing, plan, price, priceId, setPriceId } = UserState();

	useEffect(() => {
		const fetchPlanPrice = async () => {
			try {
				const response = await axios.get(
					// "/api/plan",
					"https://pose-app-server.onrender.com/api/plan",
					{
						params: { planName: plan, billingCycle: billing },
					}
				);
				setPriceId(response.data.priceid);
			} catch (error) {
				console.error("Error fetching plan price:", error);
			}
		};

		fetchPlanPrice();
	});

	const items = {
		price: priceId,
		quantity: 1,
	};

	const checkoutOptions = {
		lineItems: [items],
		mode: "subscription",
		successUrl: "https://sharon-pos-app.netlify.app/active",
		cancelUrl: "https://sharon-pos-app.netlify.app/cancel",
	};

	const redirectToCheckout = async () => {
		setLoading(true);
		console.log("Redirect To CheckOut");
		const { error } = await stripe.redirectToCheckout(checkoutOptions);
		console.log("Stripe Checkout Error" + error);

		if (error) {
			alert(error.message);
		}
		setLoading(false);
	};

	return (
		<Box
			backgroundColor="#26528C"
			backgroundSize="cover"
			backgroundPosition="center"
			backgroundRepeat="no-repeat"
			height="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center">
			<Box backgroundColor="white">
				<HStack spacing="4px">
					<Box padding="8">
						<Heading
							as="h1"
							fontWeight="bold"
							fontSize="24px"
							letterSpacing="-0.5px">
							Complete Payment
						</Heading>
						<Text paddingTop="2" paddingBottom="4">
							Enter your credit or debit card details below
						</Text>
						<CardElement />
						<Box paddingTop="4">
							{/* color="#0969da" */}
							<Button
								bg="#26528C"
								color="white"
								_hover={{ bg: "green", color: "white" }}
								onClick={redirectToCheckout}
								disabled={loading}>
								Confirm Payment
							</Button>
						</Box>
					</Box>

					<Box padding="8" backgroundColor="#CCCC">
						<Stack>
							<Text textDecoration="bold">Order Summary</Text>
							<Table>
								<Tbody>
									<Tr>
										<Td>Plan Name</Td> <Td>{plan}</Td>
									</Tr>
									<Tr>
										<Td>Billing Cycle</Td> <Td>{billing}</Td>
									</Tr>
									<Tr>
										<Td>Plan Price</Td>
										<Td>
											{price}/{billing}
										</Td>
									</Tr>
								</Tbody>
							</Table>
						</Stack>
					</Box>
				</HStack>
			</Box>
		</Box>
	);
};

export default CardDetails;
