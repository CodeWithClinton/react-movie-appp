import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, onClear, loading }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-20 h-14 text-lg bg-card border-border focus:border-primary focus:bg-input-focus transition-all duration-300 shadow-card"
            disabled={loading}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          disabled={!query.trim() || loading}
          className="mt-4 w-full h-12 bg-gradient-primary text-primary-foreground font-semibold shadow-glow-primary hover:shadow-card-hover transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" />
              Searching...
            </>
          ) : (
            'Search Movies'
          )}
        </Button>
      </form>
    </div>
  );
};