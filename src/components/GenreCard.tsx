import { Link } from 'react-router-dom';
import { Genre } from '../types/movie';
import { ChevronRight } from 'lucide-react';

interface GenreCardProps {
  genre: Genre;
}

export const GenreCard = ({ genre }: GenreCardProps) => {
  return (
    <Link to={`/genres/${genre.id}`}>
      <div className="group bg-gradient-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 border border-border hover:border-primary/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            {genre.name}
          </h3>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
        </div>
        
        <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-relaxed">
          {genre.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-border group-hover:border-primary/20 transition-colors duration-200">
          <div className="flex flex-wrap gap-2">
            {genre.searchTerms.slice(0, 3).map((term, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md group-hover:bg-primary/20 group-hover:text-primary transition-all duration-200"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};