const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}/storage/${path}`;
};