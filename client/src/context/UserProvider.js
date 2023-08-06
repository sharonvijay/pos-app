import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(""); //Login
	const [userName, setUserName] = useState(""); //Login
	const [userEmail, setUserEmail] = useState(""); //Login
	const [plan, setPlan] = useState(""); //PlanSelection
	const [videoQuality, setVideoQuality] = useState(""); //PlanSelection
	const [resolution, setResolution] = useState(""); //PlanSelection
	const [planActive, setPlanActive] = useState(false);
	const [price, setPrice] = useState(0); //PlanSelection
	const [priceId, setPriceId] = useState(0);
	const [billing, setBilling] = useState("Monthly"); //PlanSelection
	const [devices, setDevices] = useState(""); //PlanSelection

	// useEffect(() => {
	// 	setUser(user._id);
	// 	console.log(user._id);
	// }, []);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				plan,
				setPlan,
				billing,
				setBilling,
				price,
				setPrice,
				devices,
				setDevices,
				videoQuality,
				setVideoQuality,
				resolution,
				setResolution,
				planActive,
				setPlanActive,
				userName,
				setUserName,
				userEmail,
				setUserEmail,
				priceId,
				setPriceId,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const UserState = () => {
	return useContext(UserContext);
};

export default UserProvider;
