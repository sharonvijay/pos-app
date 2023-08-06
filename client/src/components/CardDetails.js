import React from "react";
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
	Alert,
} from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";

const CardDetails = () => {
	// const [success, setSuccess] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const { user, userName, userEmail, billing, plan, price } = UserState();
	// const duration = billing === "Monthly" ? "month" : "year";
	console.log(userName);
	console.log(userEmail);
	console.log(user);
	console.log(billing);
	console.log(plan);
	console.log(price);
	// const [planPrice, setPlanPrice] = useState(0);

	// useEffect(() => {
	// 	const fetchPlanPrice = async () => {
	// 		try {
	// 			const response = await axios.get("/api/plan/plan-price", {
	// 				params: { planName: plan, billingCycle: billing },
	// 			});
	// 			setPlanPrice(response.data.price);
	// 		} catch (error) {
	// 			console.error("Error fetching plan price:", error);
	// 		}
	// 	};

	// 	fetchPlanPrice();
	// });

	const handlePayment = async () => {
		try {
			const paymentMethod = await stripe.createPaymentMethod({
				card: elements.getElement("card"),
				type: "card",
			});
			const response = await axios.post("/api/payment", {
				// amount: price,
				username: userName,
				email: userEmail,
				paymentMethod: paymentMethod.paymentMethod.id,
				// billing: duration,
			});

			if (!response.ok) {
				return Alert("Payment UnSuccessful");
			}

			// const data = await response.json();
			// const confirm = await stripe.confirmCardPayment(data.clientSecret);

			if (response.data.status === 200) {
				console.log("Successful payment");
				navigate("/active");

				// setSuccess(true);
			}
		} catch (error) {
			console.log("Error", error);
		}
	};

	const handlesubmitdummy = async (e) => {
		e.preventDefault();
		alert("Payment Successfull");

		navigate("/active");
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
								onClick={handlesubmitdummy}>
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
