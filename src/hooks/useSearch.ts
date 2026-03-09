import { useState, useCallback } from 'react';

interface UseSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  filteredData: T[];
  filter: (item: T) => boolean;
  reset: () => void;
}

export function useSearch<T>(
  data: T[],
  searchFields: (keyof T)[]
): UseSearchReturn<T> {
  const [query, setQuery] = useState('');

  const filter = useCallback((item: T): boolean => {
    if (!query.trim()) return true;
    
    const queryLower = query.toLowerCase();
    return searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(queryLower);
      }
      return false;
    });
  }, [query, searchFields]);

  const filteredData = data.filter(filter);

  const reset = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    filteredData,
    filter,
    reset
  };
}
