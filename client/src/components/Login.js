import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Box, Heading, Center, Text, Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack, VStack, HStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { UserState } from "../context/UserProvider";
const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);

	const { setUser, setUserName, setUserEmail } = UserState();

	const toast = useToast();

	const navigate = useNavigate();

	const submitHandler = async () => {
		setLoading(true);
		if (!email || !password) {
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

		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const response = await axios.post(
				"https://pose-app-server.onrender.com/api/user/login",
				// "/api/user/login",
				{ email, password },
				config
			);

			console.log(response);

			if (response.status === 201) {
				setUser(response.data._id);
				setUserName(response.data.name);
				setUserEmail(response.data.email);
				console.log(response.data._id);
				console.log(response.data.name);
				toast({
					title: "Login Successful",
					status: "success",
					duration: 5000,
					isClosable: true,
					position: "bottom",
				});
				setLoading(false);
				navigate("/dashboard");
			} else if (response.status === 401) {
				// Handle unsuccessful login, show an error message
				// console.log(JSON.stringify(data));
				toast({
					title: "Login Failed",
					description: "Incorrect email or password",
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "bottom",
				});
				setLoading(false);
			}
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
				maxW={{ base: "100%", md: "350px" }}
				boxShadow="lg"
				borderRadius="10px"
				bg="#f6f8fa" // Slightly transparent white
				backdropFilter="blur(5px)" // Apply a blur effect for a glassy look
			>
				<Center>
					<Stack>
						<VStack mt="8">
							<Heading
								as="h1"
								fontWeight="bold"
								fontSize="24px"
								letterSpacing="-0.5px">
								Login to your account
							</Heading>
						</VStack>
						<Box
							bg="#f6f8fa"
							variant="outline"
							borderColor="#d8dee4"
							maxW="300px"
							width="100%"
							p="4">
							<form>
								<Stack>
									<FormControl id="email" isRequired>
										<FormLabel size="sm">Email </FormLabel>
										<Input
											placeholder="Enter Email Address"
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
										<HStack justifyContent="space-between">
											<FormLabel size="sm">Password</FormLabel>
										</HStack>
										<Input
											placeholder="Enter Password"
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
										Login
									</Button>
								</Stack>
							</form>
						</Box>

						<Box>
							<Center>
								<HStack fontSize="sm" spacing="1">
									<Text>New to Mypos? </Text>
									<Link
										as={RouterLink}
										to="/signup"
										color="#0969da"
										_hover={{ textDecoration: "underline" }}>
										SignUp
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

export default Login;
