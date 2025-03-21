// Authentification (register, login, logout)

export interface AuthResponse {
  token: string;
}

export const registerApi = async (name: string, email:string, password: string) : Promise<AuthResponse> => {
  const response = await fetch('app/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Erreur lors de l\'inscription');
  return await response.json();
}

export const loginApi = async (email: string, password: string) : Promise<AuthResponse> => {
  console.log('Sending login request with ', { email, password});
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  const responseBody = await response.json();

  if (!response.ok) {
    console.error('Login failed:', response.status, responseBody);
    throw new Error('Email ou mot de passe incorrect');
  }

  return responseBody;
}

