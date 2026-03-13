import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Video } from '../../types/tmdb.types';

interface VideoPlayerProps {
  videos: Video[];
  loading?: boolean;
}

export const VideoPlayer = ({ videos, loading }: VideoPlayerProps) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="mb-4 text-xl font-bold">Trailers & Videos</h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return null;
  }

  const trailers = videos.filter((v) => v.type === 'Trailer' && v.site === 'YouTube');
  const teasers = videos.filter((v) => v.type === 'Teaser' && v.site === 'YouTube');
  const clips = videos.filter((v) => v.type === 'Clip' && v.site === 'YouTube');
  const featurettes = videos.filter((v) => v.type === 'Featurette' && v.site === 'YouTube');

  const allVideos = [...trailers, ...teasers, ...clips, ...featurettes];

  if (selectedVideo) {
    return (
      <div className="py-8">
        <div className="mb-4 flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setSelectedVideo(null)}>
            Back to videos
          </Button>
          <h2 className="text-xl font-bold">{selectedVideo.name}</h2>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
            title={selectedVideo.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="mb-4 text-xl font-bold">Trailers & Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allVideos.map((video) => (
          <div
            key={video.id}
            className="group relative overflow-hidden rounded-lg bg-muted cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
              alt={video.name}
              className="aspect-video w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="white"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="p-3 space-y-2">
              <h3 className="font-medium text-sm truncate">{video.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {video.type}
                </Badge>
                {video.official && (
                  <Badge variant="outline" className="text-xs">
                    Official
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
