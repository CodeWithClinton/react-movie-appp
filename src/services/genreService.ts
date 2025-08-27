import { Genre, MovieSearchResponse } from '../types/movie';
import { searchMovies } from './movieService';


export const genres: Genre[] = [
  {
    id: 'action',
    name: 'Action',
    description: 'High-octane thrills and adrenaline-pumping adventures',
    searchTerms: ['action', 'adventure', 'superhero', 'marvel', 'batman']
  },
  {
    id: 'comedy',
    name: 'Comedy',
    description: 'Laugh-out-loud entertainment and feel-good stories',
    searchTerms: ['comedy', 'funny', 'humor', 'laugh', 'romantic comedy']
  },
  {
    id: 'drama',
    name: 'Drama',
    description: 'Compelling stories that touch the heart',
    searchTerms: ['drama', 'family', 'life', 'love', 'story']
  },
  {
    id: 'horror',
    name: 'Horror',
    description: 'Spine-chilling scares and supernatural thrills',
    searchTerms: ['horror', 'scary', 'ghost', 'monster', 'zombie']
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
    description: 'Futuristic worlds and mind-bending concepts',
    searchTerms: ['science fiction', 'sci-fi', 'space', 'alien', 'future']
  },
  {
    id: 'romance',
    name: 'Romance',
    description: 'Love stories that warm the heart',
    searchTerms: ['romance', 'love', 'wedding', 'romantic', 'valentine']
  },
  {
    id: 'thriller',
    name: 'Thriller',
    description: 'Edge-of-your-seat suspense and mystery',
    searchTerms: ['thriller', 'suspense', 'mystery', 'crime', 'detective']
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical worlds and epic adventures',
    searchTerms: ['fantasy', 'magic', 'wizard', 'dragon', 'fairy tale']
  }
];

export const getMoviesByGenre = async (genreId: string): Promise<MovieSearchResponse> => {
  const genre = genres.find(g => g.id === genreId);
  if (!genre) {
    return { Response: 'False', Error: 'Genre not found' };
  }

  // Use the first search term for the genre
  const searchTerm = genre.searchTerms[0];
  return await searchMovies(searchTerm);
};

export const getGenreById = (genreId: string): Genre | undefined => {
  return genres.find(g => g.id === genreId);
};