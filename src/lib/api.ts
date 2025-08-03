import axios from 'axios';
import { Movie, MovieDetails, MoviesResponse } from '@/types/movie';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'; // Free TMDB API key for demo
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const movieAPI = {
  // Get popular movies
  getPopularMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await api.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  },

  // Search movies
  searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
    const response = await api.get('/search/movie', {
      params: { query, page }
    });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  },

  // Get now playing movies
  getNowPlayingMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await api.get('/movie/now_playing', {
      params: { page }
    });
    return response.data;
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await api.get('/movie/top_rated', {
      params: { page }
    });
    return response.data;
  },

  // Get upcoming movies
  getUpcomingMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await api.get('/movie/upcoming', {
      params: { page }
    });
    return response.data;
  },
};

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}${path}`;
};

export const getBackdropUrl = (path: string | null): string => {
  if (!path) return '/placeholder.svg';
  return `${BACKDROP_BASE_URL}${path}`;
};