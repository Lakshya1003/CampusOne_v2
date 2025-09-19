import { loadStripe } from '@stripe/stripe-js'

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing Stripe Publishable Key')
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export interface PaymentIntent {
  clientSecret: string
  amount: number
  currency: string
}

export const initializePayment = async (amount: number) => {
  try {
    // In a real app, this would be an API call to your backend
    // which would create a payment intent and return the client secret
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })

    const paymentIntent = await response.json()
    return paymentIntent
  } catch (error) {
    console.error('Error initializing payment:', error)
    throw error
  }
}

export const processPayment = async (paymentIntent: PaymentIntent) => {
  const stripe = await stripePromise

  if (!stripe) {
    throw new Error('Stripe failed to initialize')
  }

  const { error } = await stripe.confirmPayment({
    elements: stripe.elements(),
    clientSecret: paymentIntent.clientSecret,
    confirmParams: {
      return_url: `${window.location.origin}/payment-success`,
    },
  })

  if (error) {
    throw error
  }
}

export const createPaymentElement = async (clientSecret: string) => {
  const stripe = await stripePromise
  if (!stripe) {
    throw new Error('Stripe failed to initialize')
  }

  const elements = stripe.elements({
    clientSecret,
  })

  const paymentElement = elements.create('payment')
  return { stripe, elements, paymentElement }
}

export const generateReceipt = async (paymentId: string) => {
  // In a real app, this would fetch the receipt from your backend
  return {
    id: paymentId,
    amount: 1000,
    currency: 'USD',
    date: new Date().toISOString(),
    status: 'paid',
  }
}
