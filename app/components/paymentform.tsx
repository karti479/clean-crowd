import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';  // Correct import

interface PaymentFormProps {
  clientSecret: string;
}

export default function PaymentForm({ clientSecret }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret || !isCardComplete) {
      return;
    }

    setProcessing(true);

    const cardElement = elements?.getElement(CardElement);
    if (!cardElement) {
      setError("Card Element not found.");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message || 'An error occurred');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setSuccess(true);
    }

    setProcessing(false);
  };

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setIsCardComplete(event.complete);
    setError(event.error ? event.error.message : null);
  };

  return (
    <div>
      {success ? (
        <p className="text-green-500">Payment successful!</p>  
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  letterSpacing: '0.025em',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146', iconColor: '#fa755a' },
              },
            }}
            onChange={handleCardChange}
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <button
            type="submit"
            disabled={!stripe || processing || !isCardComplete}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300 mt-4"
          >
            {processing ? 'Processing...' : 'Pay'}
          </button>
        </form>
      )}
    </div>
  );
}
