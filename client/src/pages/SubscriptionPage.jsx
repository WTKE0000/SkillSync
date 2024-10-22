import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PremiumSubscription = () => {
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    navigate('/payment');
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Premium Subscription</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Price: <span className="text-blue-600">60,000 XAF for 6 Months</span>
        </h2>
        
        <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
          <li className="flex items-center">
            <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Sorting options for better job visibility
          </li>
          <li className="flex items-center">
            <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Ability to create more posts
          </li>
          <li className="flex items-center">
            <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Access to premium job listings
          </li>
          <li className="flex items-center">
            <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Enhanced profile visibility
          </li>
          <li className="flex items-center">
            <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Priority customer support
          </li>
        </ul>
      </div>
      
      <div className="flex justify-center">
        <Link to={"/premium-payment"}>
        <button onClick={handlePaymentClick} className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Pay Now
        </button></Link>
      </div>
    </div>
  );
};

export default PremiumSubscription;