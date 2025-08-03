import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieAPI } from '@/lib/api';
import { Movie, MoviesResponse } from '@/types/movie';
import { MovieCard } from '@/components/MovieCard';
import { Header } from '@/components/Header';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Pagination } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Film, TrendingUp, Star, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('popular');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, activeTab]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response: MoviesResponse;
      
      if (searchQuery) {
        response = await movieAPI.searchMovies(searchQuery, currentPage);
      } else {
        switch (activeTab) {
          case 'now-playing':
            response = await movieAPI.getNowPlayingMovies(currentPage);
            break;
          case 'top-rated':
            response = await movieAPI.getTopRatedMovies(currentPage);
            break;
          case 'upcoming':
            response = await movieAPI.getUpcomingMovies(currentPage);
            break;
          default:
            response = await movieAPI.getPopularMovies(currentPage);
        }
      }
      
      setMovies(response.results);
      setTotalPages(Math.min(response.total_pages, 500)); // TMDB API limit
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      toast.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setActiveTab('search');
    fetchMovies();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setActiveTab('popular');
    fetchMovies();
  };

  const handleTabChange = (tab: string) => {
    if (tab !== 'search') {
      setActiveTab(tab);
      setSearchQuery('');
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  if (error && movies.length === 0) {
    return (
      <div className="min-h-screen">
        <Header onSearch={handleSearch} onClearSearch={handleClearSearch} />
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchMovies}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onSearch={handleSearch} onClearSearch={handleClearSearch} />
      
      {/* Hero Section */}
      <section className="hero-section py-16 relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Discover Amazing Movies
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore the latest releases, top-rated films, and hidden gems in our extensive movie database.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        {!searchQuery ? (
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="popular" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Popular
              </TabsTrigger>
              <TabsTrigger value="now-playing" className="flex items-center gap-2">
                <Film className="h-4 w-4" />
                Now Playing
              </TabsTrigger>
              <TabsTrigger value="top-rated" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Top Rated
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Upcoming
              </TabsTrigger>
            </TabsList>
          </Tabs>
        ) : (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-muted-foreground">
              Found {movies.length} movies
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <Film className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Movies Found</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? "Try searching with different keywords" 
                    : "No movies available at the moment"
                  }
                </p>
                {searchQuery && (
                  <Button onClick={handleClearSearch} className="mt-4">
                    Clear Search
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-12"
              />
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Index;
