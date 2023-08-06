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
			<Box borderRadius="18">
				<Card>
					<CardHeader>
						<HStack>
							<Heading>Current Plan Details</Heading>
							<Button>Cancelled</Button>
						</HStack>
					</CardHeader>
					<CardBody>
						<Stack display="block">
							<Box paddingBottom="0">Basic</Box>
							<Box>Phone+Tablet</Box>
							<Heading>$2,000/mo</Heading>
							<Button>
								<Link
									as={RouterLink}
									to="/dashboard"
									color="#0969da"
									_hover={{ textDecoration: "underline" }}>
									Choose Plan
								</Link>
							</Button>
						</Stack>
					</CardBody>
					<CardFooter>
						<Box backgroundColor="#CCCC" padding="2" borderRadius="3">
							You subscription was cancelled and you will loose you services on
							Sept 5th,2023
						</Box>
					</CardFooter>
				</Card>
			</Box>
		</Box>
	);
};

export default CancelPlan;
