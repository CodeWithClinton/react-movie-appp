import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { GenreCard } from '../components/GenreCard';
import { MovieGrid } from '../components/MovieGrid';
import { EmptyState } from '../components/EmptyState';
import { genres, getMoviesByGenre, getGenreById } from '../services/genreService';
import { Movie } from '../types/movie';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Genres = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedGenre = genreId ? getGenreById(genreId) : null;

  useEffect(() => {
    if (genreId) {
      fetchMoviesByGenre(genreId);
    }
  }, [genreId]);

  const fetchMoviesByGenre = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getMoviesByGenre(id);
      
      if (result.Response === 'True' && result.Search) {
        setMovies(result.Search);
      } else {
        setMovies([]);
        setError(result.Error || 'No movies found for this genre');
      }
    } catch (err) {
      setMovies([]);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (selectedGenre) {
    return (
      <div className="min-h-screen bg-gradient-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              to="/genres"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow transition-colors duration-200 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Genres</span>
            </Link>
            
            <div className="bg-gradient-card rounded-lg p-8 shadow-card border border-border">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {selectedGenre.name} Movies
              </h1>
              <p className="text-lg text-muted-foreground">
                {selectedGenre.description}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading movies...</p>
            </div>
          ) : movies.length > 0 ? (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Found {movies.length} movie{movies.length !== 1 ? 's' : ''}
                </p>
              </div>
              <MovieGrid movies={movies} />
            </div>
          ) : (
            <EmptyState hasSearched={true} error={error} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Browse by Genre
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore movies by category and discover new favorites in every genre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;