import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { Title, Year, Type, Poster } = movie;
  
  // Handle poster URL - use placeholder if N/A or invalid
  const posterUrl = Poster && Poster !== 'N/A' 
    ? Poster 
    : 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="group relative bg-gradient-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={Title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
          }}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-lg mb-1 line-clamp-2 drop-shadow-lg">
          {Title}
        </h3>
        <div className="flex items-center justify-between text-white/90 text-sm">
          <span className="bg-primary/90 px-2 py-1 rounded-md font-medium">
            {Year}
          </span>
          <span className="capitalize bg-accent/90 px-2 py-1 rounded-md font-medium">
            {Type}
          </span>
        </div>
      </div>
      
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-glow-card" />
      </div>
    </Link>
  );
};