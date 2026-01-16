export interface NowPlayingData {
  is_playing: boolean;
  item: NowPlayingItem | null;
}

interface NowPlayingItem {
  album: string;
  album_image: string;
  artists: string[];
  name: string;
  id?: string;
  spotify_url?: string;
  preview_url?: string;
}

export interface TopTracksData {
  tracks: Track[];
}

interface Track {
  id: string;
  name: string;
  artists: string[];
  album: string;
  album_image: string;
  spotify_url: string;
  preview_url: string;
}

export interface LeetCodeData {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  submissionCalendar: {
    [timestamp: string]: number;
  };
}

export interface Experience {
  title: string;
  window: string;
  date: string;
  description: string;
  image?: string;
  role?: string;
  technologies?: string[];
  achievements?: string[];
  metrics?: { label: string; value: string; color?: string }[];
  links?: { name: string; url: string; icon?: string }[];
}

export interface Project {
  title: string;
  window: string;
  date: string;
  description: string;
  VideoDemo?: string;
  HtmlDemo?: string;
  images: string[];
  links?: { name: string; url: string }[];
  id?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  demoVideos?: { title: string; url: string; description?: string; duration?: string }[];
  metrics?: { label: string; value: string; color?: string; icon?: string }[];
  techStack?: string[];
  architecture?: string[] | string;
  features?: string[];
  teamSize?: number;
  impact?: string;
  challenges?: string[];
  futureWork?: string[];
  testing?: string;
  performance?: Record<string, string>;
  recognition?: string | string[];
  complexity?: string;
  datasets?: string[];
  clinicalImpact?: string;
  algorithms?: string | string[];
  methodologies?: string | string[];
}
