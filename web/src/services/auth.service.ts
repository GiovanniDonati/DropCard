import api from './api';
import { LoginDto, AuthResponseDto } from '../types/auth';

export const login = async (data: LoginDto): Promise<AuthResponseDto> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};
