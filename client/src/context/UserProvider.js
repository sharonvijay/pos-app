import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [plan, setPlan] = useState("");
	const [videoQuality, setVideoQuality] = useState("");
	const [resolution, setResolution] = useState("");
	const [planActive, setPlanActive] = useState(false);
	const [price, setPrice] = useState(0);
	const [billing, setBilling] = useState("Monthly");
	const [devices, setDevices] = useState("Monthly");

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
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const UserState = () => {
	return useContext(UserContext);
};

export default UserProvider;
