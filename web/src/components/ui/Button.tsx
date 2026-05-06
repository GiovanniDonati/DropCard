import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button 
    className={`px-4 py-2 border border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-black transition uppercase tracking-widest terminal-border ${className}`} 
    {...props}
  >
    {children}
  </button>
);
