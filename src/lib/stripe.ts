import { loadStripe } from '@stripe/stripe-js';

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing Stripe Publishable Key');
}

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

/**
 * This is a mock function to simulate generating a receipt.
 * In a real application, this would fetch the receipt from your backend.
 */
export const generateReceipt = async (paymentId: string) => {
  return {
    id: paymentId,
    amount: 1000,
    currency: 'USD',
    date: new Date().toISOString(),
    status: 'paid',
  };
};