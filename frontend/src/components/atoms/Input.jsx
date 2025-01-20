import React from 'react';

const Input = ({ type = "text", placeholder, value, onChange, className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;