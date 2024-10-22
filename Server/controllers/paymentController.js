import Stripe from 'stripe';
import Payment from '../models/paymentModel.js';

const stripe = new Stripe('sk_test_51QC8MqFQqjnOIn03B8a6lrUEvW7sxTb7MPXLkYBufkQW4jjVx8KTGcEM01AVgK74dWuoiPBDrh5xkscafUqeaxF700kGQeGHaJ');

// Create subscription controller
export const createSubscription = async (req, res) => {
  try {
    const { userId } = req.body;

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Premium Subscription' },
            unit_amount: 30000, // Amount in cents for 6 months
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    // Save subscription info in Payment model
    const payment = new Payment({ user: userId, subscriptionId: session.id });
    await payment.save();

    // Return the session URL to redirect the user to Stripe checkout
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Failed to create subscription' });
  }
};

// Webhook handler for Stripe
export const handleWebhook = async (req, res) => {
  let event;

  // Parse the request body and verify webhook signature
  const sig = req.headers['stripe-signature'];

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody, // rawBody must be available as a buffer in Express
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Find the payment associated with this session and update its status
    const payment = await Payment.findOne({ subscriptionId: session.id });
    if (payment) {
      payment.status = 'active';
      await payment.save();
    }
  }

  res.status(200).json({ received: true });
};

// Process a one-time payment
export const processPayment = async (req, res) => {
  try {
    const { user } = req.body;
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Amount in the smallest currency unit (1000 cents = $10)
      currency: 'usd',
      metadata: { userId: user },
    });

    // Return the payment intent client secret
    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    };

    res.json(response);
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Failed to process payment' });
  }
};
