import { loadStripe } from "@stripe/stripe-js";

// Ensure this matches your .env key or fallback for local dev
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_your_publishable_key_here";

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
