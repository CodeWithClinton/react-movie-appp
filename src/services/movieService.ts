import { MovieSearchResponse, MovieDetail } from '../types/movie';

const API_KEY = 'f765fd64';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query: string): Promise<MovieSearchResponse> => {
  if (!query.trim()) {
    return { Response: 'False', Error: 'Please enter a movie title' };
  }

  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );
    
    if (!response.ok) {
      throw new Error('Network error');
    }
    
    const data: MovieSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { 
      Response: 'False', 
      Error: 'Failed to search movies. Please check your connection.' 
    };
  }
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetail> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error('Network error');
    }
    
    const data: MovieDetail = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return { 
      Response: 'False', 
      Error: 'Failed to fetch movie details. Please check your connection.',
      imdbID: '',
      Title: '',
      Year: '',
      Rated: '',
      Released: '',
      Runtime: '',
      Genre: '',
      Director: '',
      Writer: '',
      Actors: '',
      Plot: '',
      Language: '',
      Country: '',
      Awards: '',
      Poster: '',
      Ratings: [],
      Metascore: '',
      imdbRating: '',
      imdbVotes: '',
      Type: '',
      DVD: '',
      BoxOffice: '',
      Production: '',
      Website: ''
    };
  }
};