import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardDetails from "./CardDetails";
import Payment from "./Payment";
const PUBLIC_KEY =
	"pk_test_51NbfAJSERskCfAFvDH8s3lkpE0n9x7XwMpuzQGN9OiSCjth4VYMMNXfLfPTSKmmHhb6aigQPVzNskw8geibwTFXW00Fxxbwblf";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
	return (
		<Elements stripe={stripeTestPromise}>
			<CardDetails />
			{/* <Payment /> */}
		</Elements>
	);
};

export default StripeContainer;
