// /app/auth/error/page.tsx
"use client"

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const ErrorPage: React.FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Authentication Error</h1>
      <p>An error occurred during authentication: {error}</p>
    </div>
  );
};

// Wrap the ErrorPage component in Suspense
const WrappedErrorPage: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ErrorPage />
  </Suspense>
);

export default WrappedErrorPage;
