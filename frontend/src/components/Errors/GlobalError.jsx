import React from 'react';

const GlobalError = ({ errorCode, errorMessage, onRetry }) => {
  const defaultErrorMessage = "Slow internet connection or an unexpected error occurred.";
  const defaultErrorCode = "Error 500";

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex w-min-full w-screen flex-col items-center justify-center h-screen bg-[#1a1f2e] text-white px-4">
      <div className="bg-[#1e2536] rounded-lg p-8 text-center shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#ff4444] mb-4">
          {errorCode || defaultErrorCode}
        </h1>
        <p className="text-[#8b95a9] mb-6">
          {errorMessage || defaultErrorMessage}
        </p>
        
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-[#ff4444] rounded text-white font-semibold hover:bg-[#ff6666] transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default GlobalError;