import { loginApi, registerApi } from '@/api/auth'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

export function useAuth() {
  const token = ref(localStorage.getItem('token') || '')
  const username = ref('')
  // Décoder le token pour extraire le username
  const decodeToken = (token: string) => {
    const decoded = jwtDecode<{ sub: string }>(token)
    return decoded.sub // Supposons que `sub` contient l'email
  }

  if (token.value) {
    username.value = decodeToken(token.value)
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await registerApi(name, email, password)
      token.value = data.token
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const data = await loginApi(email, password)
      token.value = data.token
      localStorage.setItem('token', data.token)
      // Mettre à jour le nom d'utilisateur après la connexion
      username.value = decodeToken(data.token)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logout = () => {
    token.value = ''
    username.value = ''
    localStorage.removeItem('token')
  }

  return { token, register, login, logout, username }
}
