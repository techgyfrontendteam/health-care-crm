import React from 'react';
import { FileText, Download, Image as ImageIcon, Video as VideoIcon, Music, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { parseLocationUrlOrData } from './ChatMessageContent';

interface ChatMessageMediaProps {
  mediaUrl?: string | null;
  isSent?: boolean;
}

export const getMediaType = (url: string) => {
  if (!url) return 'unknown';
  try {
    const cleanUrl = url.split('?')[0].toLowerCase();
    
    if (/\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff)$/i.test(cleanUrl)) {
      return 'image';
    }
    if (/\.(mp4|3gp|mov|avi|webm|mkv|flv|wmv)$/i.test(cleanUrl)) {
      return 'video';
    }
    if (/\.(mp3|ogg|wav|m4a|aac|flac|wma|opus)$/i.test(cleanUrl)) {
      return 'audio';
    }
    if (parseLocationUrlOrData(url)) {
      return 'location';
    }
    return 'document';
  } catch {
    return 'document';
  }
};

export const ChatMessageMedia: React.FC<ChatMessageMediaProps> = ({ mediaUrl, isSent = false }) => {
  if (!mediaUrl) return null;

  const mediaType = getMediaType(mediaUrl);
  const cleanPath = mediaUrl.split('?')[0];
  const rawFileName = cleanPath.split('/').pop() || 'Attachment';
  const fileName = decodeURIComponent(rawFileName);
  const fileExt = fileName.includes('.') ? fileName.split('.').pop()?.toUpperCase() : 'FILE';

  if (mediaType === 'image') {
    return (
      <div className="my-1 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 max-w-[260px] sm:max-w-[300px] bg-black/5 dark:bg-white/5">
        <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
          <img
            src={mediaUrl}
            alt="WhatsApp Image"
            className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-200 max-h-[300px]"
            loading="lazy"
            onError={(e) => {
              // If image fails to load as an img tag, hide img and show fallback link
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = e.currentTarget.parentElement?.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        </a>
        <a
          href={mediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'none' }}
          className="p-3 items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ImageIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Open Image Attachment</span>
        </a>
      </div>
    );
  }

  if (mediaType === 'video') {
    return (
      <div className="my-1 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 max-w-[280px] sm:max-w-[320px] bg-black">
        <video
          src={mediaUrl}
          controls
          className="w-full h-auto max-h-[300px]"
          preload="metadata"
        >
          Your browser does not support video playback.
        </video>
      </div>
    );
  }

  if (mediaType === 'audio') {
    return (
      <div className="my-1 py-1 min-w-[220px] max-w-[280px]">
        <audio src={mediaUrl} controls className="w-full h-9" preload="metadata" />
      </div>
    );
  }

  const locationData = parseLocationUrlOrData(mediaUrl);
  if (mediaType === 'location' || locationData) {
    const { latitude, longitude, name, address, url } = locationData || {
      url: mediaUrl,
      name: 'Shared Location'
    };
    const googleMapsUrl =
      url || (latitude != null && longitude != null ? `https://www.google.com/maps?q=${latitude},${longitude}` : mediaUrl);

    return (
      <div className="my-1 rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/[0.03] dark:bg-white/[0.05] min-w-[240px] max-w-[300px] shadow-sm">
        {/* Map visual header banner */}
        <div
          className="h-28 relative bg-[#e5e0d8] dark:bg-[#1a2328] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(#00a884 0.75px, transparent 0.75px), radial-gradient(#00a884 0.75px, #e5e0d8 0.75px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        >
          {/* Pin icon */}
          <div className="relative flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#ea4335] text-white flex items-center justify-center shadow-md z-10 border-2 border-white">
              <MapPin className="h-5 w-5 fill-current" />
            </div>
            <div className="w-3 h-1.5 bg-black/20 rounded-full mt-0.5 blur-[1px]" />
          </div>
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1">
            <Navigation className="h-2.5 w-2.5 text-[#4285f4]" />
            <span>Location</span>
          </div>
        </div>

        {/* Coordinates & Info */}
        <div className="p-3">
          <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
            {name || 'Shared Location'}
          </p>
          {address && (
            <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 mt-0.5">
              {address}
            </p>
          )}
          {latitude != null && longitude != null && (
            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1">
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
          )}
        </div>

        {/* Action: Open in Google Maps */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="border-t border-black/10 dark:border-white/10 py-2.5 px-3 text-center text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>View on Google Maps</span>
        </a>
      </div>
    );
  }

  // Document or fallback
  return (
    <a
      href={mediaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`my-1 flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${
        isSent
          ? 'bg-emerald-800/10 border-emerald-700/20 hover:bg-emerald-800/20 text-zinc-900 dark:text-zinc-100'
          : 'bg-zinc-100 dark:bg-zinc-700/50 border-zinc-200 dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
      }`}
    >
      <div className="p-2 rounded-md bg-white dark:bg-zinc-800 shadow-sm flex-shrink-0">
        <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold truncate" title={fileName}>
          {fileName}
        </p>
        <span className="text-[10px] opacity-75 uppercase font-medium">
          {fileExt || 'DOCUMENT'} • Click to view
        </span>
      </div>
      <Download className="w-4 h-4 opacity-75 flex-shrink-0 ml-1" />
    </a>
  );
};
