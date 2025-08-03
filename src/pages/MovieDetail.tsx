import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieAPI, getImageUrl, getBackdropUrl } from '@/lib/api';
import { MovieDetails } from '@/types/movie';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Clock, 
  DollarSign,
  Heart,
  ExternalLink 
} from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { updateUserFavorites } from '@/lib/auth';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id && user) {
      setIsFavorite(user.favoriteMovies?.includes(parseInt(id)) || false);
    }
  }, [id, user]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const movieData = await movieAPI.getMovieDetails(parseInt(id));
        setMovie(movieData);
        setError(null);
      } catch (err) {
        setError('Failed to load movie details');
        toast.error('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      navigate('/login');
      return;
    }

    if (!movie) return;

    try {
      updateUserFavorites(movie.id);
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <h2 className="text-xl font-semibold mb-2">Movie Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The movie you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${getBackdropUrl(movie.backdrop_path)})`
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-2xl"
            />
            <div className="text-white space-y-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/20 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic">{movie.tagline}</p>
              )}
              
              <div className="flex flex-wrap gap-4 items-center">
                <Badge variant="secondary" className="bg-black/50 text-white text-lg px-3 py-1">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                </Badge>
                <span className="flex items-center text-gray-300">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="flex items-center text-gray-300">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatRuntime(movie.runtime)}
                </span>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleFavoriteClick}
                  variant={isFavorite ? "cinema" : "outline"}
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
                {movie.homepage && (
                  <Button 
                    onClick={() => window.open(movie.homepage, '_blank')}
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Official Site
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-lg leading-relaxed">{movie.overview}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre.id} variant="outline">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Movie Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className="ml-2 text-muted-foreground">{movie.status}</span>
                  </div>
                  <div>
                    <span className="font-medium">Original Language:</span>
                    <span className="ml-2 text-muted-foreground uppercase">{movie.original_language}</span>
                  </div>
                  {movie.budget > 0 && (
                    <div>
                      <span className="font-medium">Budget:</span>
                      <span className="ml-2 text-muted-foreground">{formatCurrency(movie.budget)}</span>
                    </div>
                  )}
                  {movie.revenue > 0 && (
                    <div>
                      <span className="font-medium">Revenue:</span>
                      <span className="ml-2 text-muted-foreground">{formatCurrency(movie.revenue)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {movie.production_companies.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Production Companies</h3>
                  <div className="space-y-2">
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className="text-muted-foreground">
                        {company.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};