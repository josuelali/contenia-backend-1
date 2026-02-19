import { loadStripe } from '@stripe/stripe-js';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RNALTE15RCURYu3jErT82VBtn5GhI5rykGcu5MCcmXwwiyWGQqKJdhuuUNGqrhUcz1dVi6N2vzfhfBvCxEXmVxB00wmbHZfOJ';

export const stripePromise = loadStripe(stripeKey);

export const createSubscription = async (priceId: string) => {
  const response = await fetch('/api/create-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ planId: priceId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create subscription');
  }

  return response.json();
};

export const openBillingPortal = async () => {
  const response = await fetch('/api/billing-portal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to open billing portal');
  }

  const { url } = await response.json();
  window.open(url, '_blank');
};