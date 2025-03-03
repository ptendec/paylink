const API_URL = import.meta.env.VITE_API_URL as string;

export const _fetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok && response.status !== 202) {
    const error = await response
      .json()
      .catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
};
