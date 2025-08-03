import { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateUserFavorites } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { toast } from 'sonner';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const { user, isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(
    user?.favoriteMovies?.includes(movie.id) || false
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      updateUserFavorites(movie.id);
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  return (
    <Card 
      className="movie-card cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-[400px] object-cover rounded-t-lg"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white"
              onClick={handleFavoriteClick}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/70 text-white">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {movie.vote_average.toFixed(1)}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(movie.release_date).getFullYear()}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3">
            {movie.overview}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};