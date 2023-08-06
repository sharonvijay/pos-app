import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Box, Heading, Center, useToast, Link, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack, VStack, HStack } from "@chakra-ui/layout";
const Register = () => {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);

	const toast = useToast();
	const navigate = useNavigate();

	const submitHandler = async () => {
		setLoading(true);
		if (!name || !email || !password) {
			toast({
				title: "Please Fill all the Feilds",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}

		console.log(name, email, password);
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const { data } = await axios.post(
				"https://pose-app-server.onrender.com/api/user",
				{
					name,
					email,
					password,
				},
				config
			);
			console.log(data);
			toast({
				title: "Registration Successful",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			navigate("/dashboard");
		} catch (error) {
			toast({
				title: "Error Occured!",
				description: error.response.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
		}
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
			<Box
				p="4"
				width={{ base: "100%", md: "80%" }}
				maxW={{ base: "100%", md: "400px" }}
				boxShadow="lg"
				borderRadius="10px"
				bg="#f6f8fa" // Slightly transparent white
				backdropFilter="blur(5px)" // Apply a blur effect for a glassy look
				WebkitBackdropFilter="blur(5px)" // For cross-browser support
			>
				<Center>
					<Stack spacing="4">
						<VStack spacing="6" mt="8">
							<Heading
								as="h1"
								fontWeight="bold"
								fontSize="24px"
								letterSpacing="-0.5px">
								Create Account
							</Heading>
						</VStack>
						<Box
							bg="#f6f8fa"
							variant="outline"
							borderColor="#d8dee4"
							maxW="308px">
							<form>
								<Stack>
									<FormControl id="name" isRequired>
										<FormLabel size="sm">Name</FormLabel>
										<Input
											placeholder="Enter Your Name"
											type="text"
											bg="white"
											borderColor="#d8dee4"
											size="sm"
											borderRadius="6px"
											onChange={(e) => {
												setName(e.target.value);
											}}
										/>
									</FormControl>
									<FormControl id="email" isRequired>
										<FormLabel size="sm">Email </FormLabel>
										<Input
											placeholder="Enter Your Email"
											type="text"
											bg="white"
											borderColor="#d8dee4"
											size="sm"
											borderRadius="6px"
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
									</FormControl>
									<FormControl id="password" isRequired>
										<FormLabel size="sm">Password</FormLabel>
										<Input
											placeholder="Enter password"
											type={"password"}
											bg="white"
											borderColor="#d8dee4"
											size="sm"
											borderRadius="6px"
											onChange={(e) => {
												setPassword(e.target.value);
											}}
										/>
									</FormControl>

									<Button
										bg="#26528C"
										color="white"
										size="sm"
										_hover={{ bg: "#2c974b" }}
										_active={{ bg: "#298e46" }}
										onClick={submitHandler}
										isLoading={loading}>
										Sign Up
									</Button>
								</Stack>
							</form>
						</Box>
						<Box variant="outline" borderColor="#d0d7de">
							<Center>
								<HStack fontSize="sm" spacing="1">
									<Text>Already have an account?</Text>
									<Link
										as={RouterLink}
										to="/"
										color="#0969da"
										_hover={{ textDecoration: "underline" }}>
										Login
									</Link>
								</HStack>
							</Center>
						</Box>
					</Stack>
				</Center>
			</Box>
		</Box>
	);
};

export default Register;
