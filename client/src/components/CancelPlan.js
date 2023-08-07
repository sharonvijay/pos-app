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

const CancelPlan = () => {
	const currentDate = new Date();
	const cancellationDate = new Date(currentDate);
	cancellationDate.setMonth(cancellationDate.getMonth() + 1);
	// Format the date as a string
	const options = { year: "numeric", month: "long", day: "numeric" };
	const formattedDate = cancellationDate.toLocaleDateString("en-US", options);
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
						<HStack>
							<Heading>Current Plan Details</Heading>
							<Box
								borderRadius="3"
								paddingLeft="2"
								paddingRight="2"
								paddingTop="1"
								paddingBottom="1"
								backgroundColor="#FFEBEE"
								color="red"
								fontWeight="bold">
								Cancelled
							</Box>
						</HStack>
					</CardHeader>
					<CardBody>
						<Stack display="block">
							<Box paddingBottom="0">Basic</Box>
							<Box>Phone+Tablet</Box>
							<Heading>&#8377;2,000/mo</Heading>
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
					<CardFooter marginTop="0">
						<Box backgroundColor="#CCCC" padding="2" borderRadius="3">
							Your subscription was cancelled and you will lose your services on{" "}
							{formattedDate}
						</Box>
					</CardFooter>
				</Card>
			</Box>
		</Box>
	);
};

export default CancelPlan;
