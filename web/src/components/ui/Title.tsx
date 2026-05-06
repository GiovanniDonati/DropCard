import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({ children }) => (
  <h1 className="text-2xl font-bold mb-4">{children}</h1>
);
