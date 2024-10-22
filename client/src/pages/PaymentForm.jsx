// import React, { useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     const cardElement = elements.getElement(CardElement);

//     const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (paymentError) {
//       setError(paymentError.message);
//       setLoading(false);
//     } else {
//       // Handle successful payment here (e.g., send paymentMethod.id to your backend)
//       console.log('Payment Method:', paymentMethod);
//       setSuccess(true);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
//       <form onSubmit={handleSubmit}>
//         <CardElement className="border p-3 rounded mb-4" />
        
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         {success && <div className="text-green-500 mb-4">Payment Successful!</div>}
        
//         <button
//           type="submit"
//           className={`bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ${loading ? 'opacity-50' : ''}`}
//           disabled={!stripe || loading}
//         >
//           {loading ? 'Processing...' : 'Pay Now'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;