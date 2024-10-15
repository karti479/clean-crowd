// Add this at the top of the file
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Post, Bid } from '@/lib/types';
import BidForm from '@/app/components/bidform';
import FeedbackForm from '@/app/components/feedbackform';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@/app/components/paymentform';
import Image from 'next/image';  // Import next/image

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ViewPost() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.bids);  // Log the bids to inspect userId
        setPost(data);
      }
      setIsLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleFund = async (amount: number) => {
    if (!session) {
      alert('You must be logged in to fund a project');
      return;
    }

    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: id, amount }),
    });

    if (response.ok) {
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } else {
      alert('Failed to process payment. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{post.location}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={post.imageUrl}
            alt="Issue location"
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
          />
          <p className="text-gray-700 mb-4">{post.description}</p>
          <div className="bg-teal-100 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold mb-2">Funding Progress</h2>
            <p className="text-2xl font-bold text-teal-600">
              ₹{post.currentFunding} / ₹{post.estimatedCost}
            </p>
            <div className="w-full bg-teal-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-teal-600 h-2.5 rounded-full"
                style={{
                  width: `${(post.currentFunding / post.estimatedCost) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm clientSecret={clientSecret} />
            </Elements>
          )}
          {!clientSecret && (
            <button
              onClick={() => {
                const amount = prompt('Enter funding amount (₹):');
                if (amount) {
                  handleFund(parseFloat(amount));
                }
              }}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300"
            >
              Contribute Funds
            </button>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Bids</h2>
          {post.bids.length > 0 ? (
            <ul className="space-y-4">
              {post.bids.map((bid: Bid) => (
                <li key={bid.id} className="bg-white p-4 rounded-lg shadow">
                  <p className="font-bold">Cleaner ID: {bid.userId || 'Unknown'}</p>
                  <p>Bid Amount: ₹{bid.amount}</p>
                  <p className="text-sm text-gray-500">
                    Submitted on: {new Date(bid.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bids yet.</p>
          )}
          <h2 className="text-2xl font-bold mt-8 mb-4">Submit a Bid</h2>
          <BidForm postId={post.id} />
          {post.status === 'completed' && (
            <>
              <h2 className="text-2xl font-bold mt-8 mb-4">Provide Feedback</h2>
              <FeedbackForm postId={post.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
