import { Navigation } from '../components/Navigation';
import { SearchBar } from '../components/SearchBar';
import { MovieGrid } from '../components/MovieGrid';
import { EmptyState } from '../components/EmptyState';
import { useMovieSearch } from '../hooks/useMovieSearch';

const Index = () => {
  const { movies, loading, error, hasSearched, search, clear } = useMovieSearch();

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      {/* Header */}
      <header className="pt-8 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 tracking-tight">
              Movie Finder
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover and explore movies from around the world. Search by title and find your next favorite film.
            </p>
          </div>
          
          <SearchBar onSearch={search} onClear={clear} loading={loading} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        {movies.length > 0 ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Search Results
              </h2>
              <p className="text-muted-foreground">
                Found {movies.length} movie{movies.length !== 1 ? 's' : ''}
              </p>
            </div>
            <MovieGrid movies={movies} />
          </div>
        ) : (
          <EmptyState hasSearched={hasSearched} error={error} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Powered by{' '}
            <a 
              href="https://www.omdbapi.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-glow transition-colors duration-200"
            >
              OMDb API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
