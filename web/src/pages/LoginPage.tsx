import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Title } from '../components/ui/Title';

export const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login({ name, password });
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center max-md:items-start max-md:pt-48 h-screen bg-gradient-to-br from-black/80 to-green-950/70">
      <form onSubmit={handleLogin} className="w-80 p-8 terminal-border bg-black/50">
        <Title>SYSTEM ACCESS</Title>
        <Input placeholder="USER_NAME" value={name} onChange={(e) => setName(e.target.value)} />
        <Input 
          type="password" 
          placeholder="PASSWORD" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button className="mt-8 w-full">INITIATE_LOGIN</Button>
      </form>
    </div>
  );
};
