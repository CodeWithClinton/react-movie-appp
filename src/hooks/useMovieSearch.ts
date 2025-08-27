import { useState } from 'react';
import { Movie } from '../types/movie';
import { searchMovies } from '../services/movieService';

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a movie title');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const result = await searchMovies(query);
      
      if (result.Response === 'True' && result.Search) {
        setMovies(result.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(result.Error || 'No movies found');
      }
    } catch (err) {
      setMovies([]);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMovies([]);
    setError(null);
    setHasSearched(false);
  };

  return {
    movies,
    loading,
    error,
    hasSearched,
    search,
    clear
  };
};