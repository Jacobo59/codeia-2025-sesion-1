import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import type { Cast } from '../../types/tmdb.types';

interface CastSectionProps {
  cast: Cast[];
  loading?: boolean;
}

export const CastSection = ({ cast, loading }: CastSectionProps) => {
  if (loading) {
    return (
      <div className="py-8">
        <h2 className="mb-4 text-xl font-bold">Cast</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-32 space-y-2">
              <div className="w-32 h-32 rounded-full bg-muted animate-pulse" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!cast || cast.length === 0) {
    return null;
  }

  const displayCast = cast.slice(0, 15);

  return (
    <div className="py-8">
      <h2 className="mb-4 text-xl font-bold">Cast</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {displayCast.map((person) => (
          <div key={person.id} className="flex-shrink-0 w-32">
            <Avatar className="w-32 h-32 mb-2">
              {person.profile_path ? (
                <AvatarImage
                  src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w185${person.profile_path}`}
                  alt={person.name}
                />
              ) : null}
              <AvatarFallback className="text-2xl font-semibold">
                {person.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-sm truncate">{person.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
