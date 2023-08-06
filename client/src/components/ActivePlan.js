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
							<Button>Active</Button>
							<Link
								as={RouterLink}
								to="/cancel"
								color="#0969da"
								_hover={{ textDecoration: "underline" }}>
								Cancel
							</Link>
						</HStack>
					</CardHeader>
					<CardBody>
						<Stack display="block">
							<Box paddingBottom="0">{plan}</Box>
							<Box>{devices}</Box>
							<Heading>
								${price}/{billing === "Monthly" ? "mo" : "yr"}
							</Heading>
							<Button>
								<Link
									as={RouterLink}
									to="/dashboard"
									color="#0969da"
									_hover={{ textDecoration: "underline" }}>
									Change Plan
								</Link>
							</Button>
						</Stack>
					</CardBody>
					<CardFooter>
						<Box backgroundColor="#CCCC" padding="2" borderRadius="3">
							You subscription has started on Aug 5th,2023 and will auto renew
							on Sept 5th,2023
						</Box>
					</CardFooter>
				</Card>
			</Box>
		</Box>
	);
};

export default ActivePlan;
