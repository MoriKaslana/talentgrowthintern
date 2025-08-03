import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Heart, Film, Calendar } from 'lucide-react';
import { Header } from '@/components/Header';
import { Movie } from '@/types/movie';
import { movieAPI } from '@/lib/api';
import { MovieCard } from '@/components/MovieCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchFavoriteMovies = async () => {
      if (!user?.favoriteMovies || user.favoriteMovies.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const moviePromises = user.favoriteMovies.map(id => 
          movieAPI.getMovieDetails(id)
        );
        const movies = await Promise.all(moviePromises);
        setFavoriteMovies(movies);
      } catch (error) {
        console.error('Failed to fetch favorite movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [user, isAuthenticated, navigate]);

  const handleSearch = () => {};
  const handleClearSearch = () => {};

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header onSearch={handleSearch} onClearSearch={handleClearSearch} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{user.name}</CardTitle>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member since {new Date().getFullYear()}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{user.favoriteMovies?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Favorite Movies</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Film className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">∞</div>
                <div className="text-sm text-muted-foreground">Movies Discovered</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Profile Level</div>
              </CardContent>
            </Card>
          </div>

          {/* Favorite Movies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-accent" />
                Your Favorite Movies
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : favoriteMovies.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start adding movies to your favorites to see them here
                  </p>
                  <Button onClick={() => navigate('/')}>
                    Discover Movies
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {favoriteMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};