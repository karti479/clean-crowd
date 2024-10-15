import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface BidFormProps {
  postId: string;
}

export default function BidForm({ postId }: BidFormProps) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('You must be logged in to submit a bid');
      return;
    }
    setIsSubmitting(true);
    const response = await fetch(`/api/bids`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, amount: parseFloat(amount) }),
    });
    if (response.ok) {
      alert('Bid submitted successfully!');
      setAmount('');
    } else {
      alert('Failed to submit bid. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bidAmount">
          Bid Amount (₹)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bidAmount"
          type="number"
          placeholder="Enter bid amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !session}
        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Bid'}
      </button>
    </form>
  );
}
