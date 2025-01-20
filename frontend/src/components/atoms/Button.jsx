// Button.js
import React from 'react';

export const Button = ({ onClick, children, type = "button", disabled=false, className = "", ...props }) => {
  return (
    <button disabled={disabled}
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-white rounded-md focus:outline-none ${className} ${disabled ? "bg-gray-700 hover:bg-gray-600 text-gray-500 cursor-not-allowed" :"bg-blue-600 hover:bg-blue-700"}`}
      {...props}
    >
      {children}
    </button>
  );
};