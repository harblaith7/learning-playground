import React, {useState} from 'react'
import "./CheckoutForm.css"
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import axios from 'axios'


const CheckoutForm = () => {
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const elements = useElements()
    const stripe = useStripe()

    const handleCardDetailsChange = async (ev) => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    const handleSubmit = async ev => {
        ev.preventDefault()

        // Collect billing info
        const billingDetails = {
            name: ev.target.name.value,
            email: ev.target.email.value,
            address: {
                line1: ev.target.address.value
            }
          };
        
        setProcessingTo(true);

        const cardElement = elements.getElement("card");

        const {data: clientSecret} = await axios.post(
            'http://localhost:4000',
            {amount: 5000}
        )

        console.log(clientSecret)

        const paymentMethodReq = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: billingDetails
          });

          console.log(paymentMethodReq)

          const {error} = await stripe.confirmCardPayment(clientSecret, {
              payment_method: paymentMethodReq.paymentMethod.id
          })

    }

    return (
        <form className="CheckoutForm" onSubmit={handleSubmit}>
            {checkoutError && <div>{checkoutError}</div>}
            <input type="text" placeholder="Full name" name="name" required/>
            <input type="text" placeholder="Address" name="address" required/>
            <input type="text" placeholder="Email" name="email" required/>
            <div className="CheckoutForm__div">
                <CardElement
                    options = {{
                        hidePostalCode: true
                    }}
                    onChange={handleCardDetailsChange}
                />
            </div>
            <button disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay`}
            </button>
        </form>
    )
}


export default CheckoutForm
