import { useState, useEffect } from 'react';
import { MovieDetail } from '../types/movie';
import { getMovieDetails } from '../services/movieService';

export const useMovieDetail = (imdbID: string) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!imdbID) {
        setError('No movie ID provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await getMovieDetails(imdbID);
        
        if (result.Response === 'True') {
          setMovie(result);
          setError(null);
        } else {
          setMovie(null);
          setError(result.Error || 'Movie not found');
        }
      } catch (err) {
        setMovie(null);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  return {
    movie,
    loading,
    error
  };
};