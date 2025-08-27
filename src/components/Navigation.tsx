import { Link, useLocation } from 'react-router-dom';
import { Search, Film, Home } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            <Film className="w-6 h-6 text-primary" />
            <span>Movie Finder</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground shadow-glow-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Search</span>
            </Link>
            
            <Link
              to="/genres"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/genres') 
                  ? 'bg-primary text-primary-foreground shadow-glow-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Genres</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};