import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Center,
	Heading,
	Button,
	Link,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from "@chakra-ui/react";
import { UserState } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

// import "./PlanSelection.css";
const ToggleButtons = ({ leftLabel, rightLabel, selected, onChange }) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				backgroundColor: "#26528C",
				borderRadius: "30px",
				padding: "10px",
			}}>
			<Button
				variant={"ghost"}
				backgroundColor={selected === leftLabel ? "white" : "#26528C"}
				onClick={() => onChange(leftLabel)}
				borderRadius="20px"
				color={selected === leftLabel ? "#26528C" : "white"}>
				{leftLabel}
			</Button>
			<Button
				variant={"ghost"}
				backgroundColor={selected === rightLabel ? "white" : "#26528C"}
				onClick={() => onChange(rightLabel)}
				borderRadius="20px"
				color={selected === rightLabel ? "#26528C" : "white"}>
				{rightLabel}
			</Button>
		</div>
	);
};
const planDevicesMap = {
	Mobile: "Phone+Tablet",
	Basic: "Phone+ Tablet+ Computer+ TV",
	Standard: "Phone+ Tablet+ Computer+ TV",
	Premium: "Phone+ Tablet+ Computer+ TV",
};
const plansData = [
	{
		name: "Mobile",
		price: 100,
		videoQuality: "Good",
		resolution: "480p",
		devices: ["Phone", "Tablet"],
	},
	{
		name: "Basic",
		price: 200,
		videoQuality: "Good",
		resolution: "480p",
		devices: ["Phone", "Tablet", "Computer", "TV"],
	},
	{
		name: "Standard",
		price: 500,
		videoQuality: "Better",
		resolution: "1080p",
		devices: ["Phone", "Tablet", "Computer", "TV"],
	},
	{
		name: "Premium",
		price: 700,
		videoQuality: "Best",
		resolution: "4K+HDR",
		devices: ["Phone", "Tablet", "Computer", "TV"],
	},
];

const PlanSelection = () => {
	const [selectedPlan, setSelectedPlan] = useState("");
	const [selectedDuration, setSelectedDuration] = useState("Monthly");
	const {
		setPlan,
		setBilling,
		setDevices,
		setPrice,
		setVideoQuality,
		setResolution,
	} = UserState();
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/");
		}
	}, [navigate]);
	const handlePlanClick = (selectedPlan) => {
		const clickedPlan = plansData.find((plan) => plan.name === selectedPlan);
		if (clickedPlan) {
			setSelectedPlan(selectedPlan);
			setPlan(selectedPlan);
			setDevices(planDevicesMap[selectedPlan]);
			setPrice(
				selectedDuration === "Monthly"
					? clickedPlan.price
					: clickedPlan.price * 10
			);
			setVideoQuality(clickedPlan.videoQuality);
			setResolution(clickedPlan.resolution);
		}
	};

	const toggleDuration = () => {
		const newBilling = selectedDuration === "Monthly" ? "Yearly" : "Monthly";
		setSelectedDuration(newBilling);
		setBilling(newBilling);
	};

	const getButtonVariant = (planName) => {
		return selectedPlan === planName ? "solid" : "outline";
	};

	return (
		<Center height="100vh">
			<div className="dashboard">
				<Center>
					<Heading as="h1" size="xl" mb={4}>
						Choose the right plan for you
					</Heading>
				</Center>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>
								<ToggleButtons
									leftLabel="Monthly"
									rightLabel="Yearly"
									selected={selectedDuration}
									onChange={toggleDuration}
								/>
							</Th>
							{plansData.map((plan) => (
								<Th key={plan.name}>
									<Button
										onClick={() => handlePlanClick(plan.name)}
										variant={getButtonVariant(plan.name)}
										backgroundColor={
											selectedPlan === plan.name ? "#26528C" : "#C9D4E2"
										}
										_hover={{ backgroundColor: "#26528C" }}
										color="white"
										padding="10"
										// className={`toggle-button ${
										// 	selectedPlan === plan.name ? "open" : ""
										// }`}
									>
										{plan.name}
									</Button>
								</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>Monthly Price</Td>
							{plansData.map((plan) => (
								<Td
									key={plan.name}
									style={{
										color: selectedPlan === plan.name ? "blue" : "black",
									}}>
									{selectedDuration === "Monthly"
										? plan.price
										: plan.price * 10}
								</Td>
							))}
						</Tr>
						<Tr>
							<Td>Video quality</Td>
							{plansData.map((plan) => (
								<Td
									key={plan.name}
									style={{
										color: selectedPlan === plan.name ? "blue" : "black",
									}}>
									{plan.videoQuality}
								</Td>
							))}
						</Tr>
						<Tr>
							<Td>Resolution</Td>
							{plansData.map((plan) => (
								<Td
									key={plan.name}
									style={{
										color: selectedPlan === plan.name ? "blue" : "black",
									}}>
									{plan.resolution}
								</Td>
							))}
						</Tr>
						<Tr>
							<Td>Devices you can use to watch</Td>
							{plansData.map((plan) => (
								<Td key={plan.name}>
									<ul>
										{plan.devices.map((device) => (
											<li
												key={device}
												style={{
													color: selectedPlan === plan.name ? "blue" : "black",
												}}>
												{device}
											</li>
										))}
									</ul>
								</Td>
							))}
						</Tr>
					</Tbody>
				</Table>
				<Center mt={4}>
					<Button
						backgroundColor="#26528C"
						color="white"
						textDecoration="none"
						_hover={{ backgroundColor: "#1c4567" }}>
						<Link
							as={RouterLink}
							to="/carddetails"
							text="white"
							_hover={{ textDecoration: "none" }}>
							Next
						</Link>
					</Button>
				</Center>
			</div>
		</Center>
	);
};

export default PlanSelection;
