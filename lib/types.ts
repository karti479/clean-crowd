// /lib/types.ts
export interface Post {
    id: string;
    location: string;
    description: string;
    estimatedCost: number;
    currentFunding: number;
    imageUrl: string;
    status: 'pending' | 'funded' | 'in_progress' | 'completed';
    bids: Bid[];
    createdAt: string;
  }
  
  export interface Bid {
    id: string;
    cleanerId: string;
    amount: number;
    userId: string;
    createdAt: string;
  }
  
  export interface Feedback {
    id: string;
    postId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
  }