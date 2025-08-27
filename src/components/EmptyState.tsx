import { Film, Search } from 'lucide-react';

interface EmptyStateProps {
  hasSearched: boolean;
  error?: string | null;
}

export const EmptyState = ({ hasSearched, error }: EmptyStateProps) => {
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-destructive/20 rounded-full flex items-center justify-center">
          <Search className="w-12 h-12 text-destructive" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {error}
        </p>
      </div>
    );
  }

  if (hasSearched) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Film className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No movies found
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find any movies matching your search. Try different keywords or check your spelling.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary">
        <Film className="w-12 h-12 text-primary-foreground" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-4">
        Discover Amazing Movies
      </h3>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        Search for your favorite movies and explore new ones. Start by typing a movie title in the search bar above.
      </p>
    </div>
  );
};