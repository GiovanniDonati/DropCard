import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === 'password';

  return (
    <div className="relative w-full mt-6">
      <input
        className="w-full px-3 py-2 bg-transparent border-b border-green-500 focus:outline-none focus:border-green-300 placeholder-green-800 text-green-500 pr-10 [:-webkit-autofill]:!bg-transparent [:-webkit-autofill]:!text-green-500"
        style={{ WebkitBoxShadow: '0 0 0px 1000px transparent inset' }}
        {...props}
        type={isPassword && showPassword ? 'text' : props.type}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-0 top-0 h-full flex items-center justify-center px-2 text-green-500 hover:text-green-300 cursor-pointer"
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
          onTouchStart={() => setShowPassword(true)}
          onTouchEnd={() => setShowPassword(false)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};
