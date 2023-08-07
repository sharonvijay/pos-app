import React from "react";
import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	HStack,
	Heading,
	Stack,
} from "@chakra-ui/react";
import { Link, Link as RouterLink } from "react-router-dom";
import { UserState } from "../context/UserProvider";

const ActivePlan = () => {
	const { plan, devices, price, billing } = UserState();
	const currentDate = new Date();
	const startDate = new Date(currentDate);
	const autoRenewDate = new Date(currentDate);
	autoRenewDate.setMonth(autoRenewDate.getMonth() + 1);
	// Format the dates as strings
	const options = { year: "numeric", month: "long", day: "numeric" };
	const formattedStartDate = startDate.toLocaleDateString("en-US", options);
	const formattedAutoRenewDate = autoRenewDate.toLocaleDateString(
		"en-US",
		options
	);
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
			<Box maxW="700px" borderRadius="18px">
				<Card>
					<CardHeader>
						<HStack spacing={4}>
							<Heading>Current Plan Details</Heading>
							<HStack spacing={3}>
								<Box
									borderRadius="3"
									paddingLeft="2"
									paddingRight="2"
									paddingTop="1"
									paddingBottom="1"
									backgroundColor="#ADD8E6"
									color="#0969da"
									fontWeight="bold">
									Active
								</Box>
								<Button backgroundColor="white" color="blue">
									<Link as={RouterLink} to="/cancel">
										Cancel
									</Link>
								</Button>
							</HStack>
						</HStack>
					</CardHeader>
					<CardBody>
						<Stack display="block">
							<Box paddingBottom="0">{plan}</Box>
							<Box>{devices}</Box>
							<Heading>
								&#8377;{price}/{billing === "Monthly" ? "mo" : "yr"}
							</Heading>
							<Box
								marginTop="6"
								borderColor="#0969da"
								borderWidth="1px"
								borderRadius="5px"
								display="inline-block">
								<Button backgroundColor="white" color="#0969da">
									<Link as={RouterLink} to="/dashboard">
										Choose Plan
									</Link>
								</Button>
							</Box>
						</Stack>
					</CardBody>
					<CardFooter>
						<Box backgroundColor="#CCCC" padding="2" borderRadius="3">
							Your subscription has started on {formattedStartDate} and will
							auto renew on {formattedAutoRenewDate}
						</Box>
					</CardFooter>
				</Card>
			</Box>
		</Box>
	);
};

export default ActivePlan;
