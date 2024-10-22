import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../utils';
import { useSelector } from "react-redux";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment status
  const { user } = useSelector((state) => state.user);

  const id = user?._id;
  const amount = 30000; // Example amount in XAF

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!id) {
      setErrorMessage("User ID is missing");
      setLoading(false);
      return;
    }

    try {
      const data = await createPaymentIntent(id);
      if (!data || !data.clientSecret) {
        throw new Error("Failed to create payment intent.");
      }

      // Confirm card payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      // Handle success
      if (paymentIntent.status === 'succeeded') {
        console.log('Payment successful:', paymentIntent);
        setErrorMessage('');
        setLoading(false);
        setPaymentSuccess(true); // Set state to true when payment is successful
      }

    } catch (error) {
      console.error("Payment Error:", error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Checkout</h2>
      <p className="text-gray-600 text-center mb-6">
        Amount to Pay: <span className="font-bold">{amount} XAF</span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-100 p-3 rounded-md">
          <CardElement className="w-full" />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading || paymentSuccess} // Disable the button if already paid
          className={`w-full py-2 px-4 rounded-md transition-all 
                      ${paymentSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} 
                      ${paymentSuccess ? 'text-white' : 'text-white'}`}
        >
          {loading ? 'Processing...' : paymentSuccess ? 'Paid' : 'Pay'}
        </button>
        {errorMessage && (
          <div className="text-red-600 mt-2 text-center">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
