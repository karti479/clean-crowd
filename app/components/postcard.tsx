"use client";

import Link from 'next/link';
import Image from 'next/image'; // Use the next/image component
import { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={post.imageUrl || '/placeholder.svg'}
        alt="Issue location"
        width={600}
        height={200} // Adjust the height based on your design
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{post.location}</h3>
        <p className="text-gray-600 mb-4">{post.description.slice(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-teal-600 font-bold">
            ₹{post.currentFunding} / ₹{post.estimatedCost}
          </span>
          <Link
            href={`/view-post/${post.id}`}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
