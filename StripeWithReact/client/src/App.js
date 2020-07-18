import React from 'react';
import './App.css';
import CheckoutForm from './components/CheckoutForm/CheckoutForm'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_test")

function App() {
  return (
    <Elements
      stripe = {stripePromise}
    >
      <div className="App">
        <CheckoutForm/>
      </div>
    </Elements>
  );
}

export default App;
