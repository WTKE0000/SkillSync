import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QC8MqFQqjnOIn03RfWBq5fuxtuTDzQR1CVbwEdnsWklu7hJ0yq2PD0Xf6gheTi0EfEMHsf3BrhoI5HPsDsRRG3G00dc2xhrGi');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Elements>
      
    </Provider>
  </React.StrictMode>
);
