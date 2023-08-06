import React from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import PlanSelection from "./components/PlanSelection";
import StripeContainer from "./components/StripeContainer";
import SelectedPlan from "./components/SelectedPlan";
import { Route, Routes } from "react-router-dom";
import ActivePlan from "./components/ActivePlan";
import CancelPlan from "./components/CancelPlan";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/signup" element={<Register />} />
			<Route path="/dashboard" element={<PlanSelection />} />
			<Route path="/carddetails" element={<StripeContainer />} />
			<Route path="/selectedplan" element={<SelectedPlan />} />
			<Route path="/active" element={<ActivePlan />} />
			<Route path="/cancel" element={<CancelPlan />} />
		</Routes>
	);
}

export default App;
