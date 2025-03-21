import { loginApi, registerApi } from '@/api/auth';
import { ref } from 'vue';

export function useAuth() {
  const token = ref(localStorage.getItem('token') || '');

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await registerApi(name, email, password);
      token.value = data.token;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginApi(email, password);
      token.value = data.token;
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    token.value = '';
    localStorage.removeItem('token');
  };

  return { token, register, login, logout };
}
