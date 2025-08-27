import { useParams, Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { ArrowLeft, Star, Calendar, Clock, Globe, Award } from 'lucide-react';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetail(id || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground text-lg">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">Movie Not Found</h2>
            <p className="text-muted-foreground mb-8">{error || 'The requested movie could not be found.'}</p>
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-lg hover:shadow-glow-primary transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/400x600/374151/9CA3AF?text=No+Image';

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={posterUrl}
                alt={movie.Title}
                className="w-full rounded-lg shadow-card-hover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x600/374151/9CA3AF?text=No+Image';
                }}
              />
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Basic Info */}
            <div className="bg-gradient-card rounded-lg p-8 shadow-card border border-border">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {movie.Title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-foreground font-medium">{movie.Year}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-foreground font-medium">{movie.Runtime}</span>
                </div>
                
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-md font-medium">
                  {movie.Rated}
                </span>
                
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-foreground font-medium">{movie.imdbRating}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.Genre.split(', ').map((genre, index) => (
                  <span 
                    key={index}
                    className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-md text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {movie.Plot}
              </p>
            </div>

            {/* Cast and Crew */}
            <div className="bg-gradient-card rounded-lg p-8 shadow-card border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Cast & Crew</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Director</h3>
                  <p className="text-muted-foreground">{movie.Director}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Writer</h3>
                  <p className="text-muted-foreground">{movie.Writer}</p>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Cast</h3>
                  <p className="text-muted-foreground">{movie.Actors}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-card rounded-lg p-8 shadow-card border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Additional Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Country</h3>
                  </div>
                  <p className="text-muted-foreground">{movie.Country}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Language</h3>
                  <p className="text-muted-foreground">{movie.Language}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Released</h3>
                  <p className="text-muted-foreground">{movie.Released}</p>
                </div>
                
                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Box Office</h3>
                    <p className="text-muted-foreground">{movie.BoxOffice}</p>
                  </div>
                )}
              </div>

              {movie.Awards && movie.Awards !== 'N/A' && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Awards</h3>
                  </div>
                  <p className="text-muted-foreground">{movie.Awards}</p>
                </div>
              )}
            </div>

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="bg-gradient-card rounded-lg p-8 shadow-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Ratings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {movie.Ratings.map((rating, index) => (
                    <div 
                      key={index}
                      className="bg-muted/30 rounded-lg p-4 text-center"
                    >
                      <h3 className="font-semibold text-foreground mb-1">{rating.Source}</h3>
                      <p className="text-2xl font-bold text-primary">{rating.Value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;