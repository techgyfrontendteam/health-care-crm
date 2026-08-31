import React from 'react';
import {
  User,
  Phone,
  Download,
  MessageSquare,
  MapPin,
  Navigation,
  ExternalLink
} from 'lucide-react';

interface ParsedContactPhone {
  phone: string;
  type?: string;
  wa_id?: string;
}

interface ParsedContact {
  name: string;
  phones: ParsedContactPhone[];
  vcard?: string;
}

export interface ParsedLocationData {
  latitude?: number | null;
  longitude?: number | null;
  name?: string;
  address?: string;
  url: string;
}

export const parseLocationUrlOrData = (input: string): ParsedLocationData | null => {
  if (!input || typeof input !== 'string') return null;
  const str = input.trim();

  // 1. JSON location object check
  if (str.startsWith('{') || str.startsWith('[')) {
    try {
      const parsed = JSON.parse(str);
      const locObj =
        parsed && typeof parsed === 'object' && !Array.isArray(parsed)
          ? parsed.location || parsed.geo || parsed
          : null;
      if (locObj && typeof locObj === 'object') {
        const lat = Number(locObj.latitude ?? locObj.lat);
        const lng = Number(locObj.longitude ?? locObj.lng ?? locObj.lon);
        if (!isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)) {
          const mapUrl = locObj.url || `https://www.google.com/maps?q=${lat},${lng}`;
          return {
            latitude: lat,
            longitude: lng,
            name: locObj.name || locObj.title || 'Shared Location',
            address: locObj.address || locObj.location_address,
            url: mapUrl
          };
        }
      }
    } catch {
      // ignore JSON parse error
    }
  }

  // 2. Google Maps / Apple Maps / Map URLs check
  const isMapHost =
    /maps\.google\.|google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.apple\.|openstreetmap\.org|waze\.com/i.test(str);

  const coordMatch =
    str.match(/(?:q=|ll=|loc:|center=|=|@)?\s*([-+]?\d{1,2}\.\d+)\s*,\s*([-+]?\d{1,3}\.\d+)/i) ||
    str.match(/q=loc:([-+]?\d{1,2}\.\d+)\+([-+]?\d{1,3}\.\d+)/i);

  if (isMapHost || coordMatch) {
    let lat: number | null = null;
    let lng: number | null = null;

    if (coordMatch) {
      const parsedLat = parseFloat(coordMatch[1]);
      const parsedLng = parseFloat(coordMatch[2]);
      if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
        lat = parsedLat;
        lng = parsedLng;
      }
    }

    const mapUrl =
      str.startsWith('http://') || str.startsWith('https://')
        ? str
        : lat !== null && lng !== null
        ? `https://www.google.com/maps?q=${lat},${lng}`
        : `https://${str}`;

    return {
      latitude: lat,
      longitude: lng,
      name: 'Shared Location',
      address: isMapHost ? 'Google Maps Location' : undefined,
      url: mapUrl
    };
  }

  // 3. Plain coordinates string check e.g., "17.437462, 78.448288"
  const plainCoordMatch = str.match(
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|(\d{1,2}))(\.\d+)?)$/
  );
  if (plainCoordMatch) {
    const parts = str.split(',').map((s) => parseFloat(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return {
        latitude: parts[0],
        longitude: parts[1],
        name: 'Shared Location',
        url: `https://www.google.com/maps?q=${parts[0]},${parts[1]}`
      };
    }
  }

  return null;
};

interface ParsedContactPhone {
  phone: string;
  type?: string;
  wa_id?: string;
}

interface ParsedContact {
  name: string;
  phones: ParsedContactPhone[];
  vcard?: string;
}

interface ParsedLocation {
  latitude?: number;
  longitude?: number;
  name?: string;
  address?: string;
  url?: string;
}

type ParsedContent =
  | { type: 'contact'; contacts: ParsedContact[] }
  | { type: 'location'; location: ParsedLocation }
  | { type: 'text'; text: string };

const parseMessageContent = (content: string): ParsedContent => {
  if (!content || typeof content !== 'string') {
    return { type: 'text', text: content || '' };
  }

  // 1. Check if it's a Location URL, JSON, or coordinates
  const locData = parseLocationUrlOrData(content);
  if (locData) {
    return {
      type: 'location',
      location: {
        latitude: locData.latitude ?? undefined,
        longitude: locData.longitude ?? undefined,
        name: locData.name,
        address: locData.address,
        url: locData.url
      }
    };
  }

  const trimmed = content.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);

      // 2. Check if it's a Contact array or object
      const items = Array.isArray(parsed) ? parsed : [parsed];
      if (
        items.length > 0 &&
        items.every(
          (item) =>
            item &&
            typeof item === 'object' &&
            (item.name || item.phones || item.vcard)
        )
      ) {
        const contacts: ParsedContact[] = items.map((item) => {
          let displayName = 'Shared Contact';
          if (typeof item.name === 'string') {
            displayName = item.name;
          } else if (item.name && typeof item.name === 'object') {
            displayName =
              item.name.formatted_name ||
              item.name.first_name ||
              item.name.last_name ||
              'Shared Contact';
          }

          const phonesList: ParsedContactPhone[] = [];
          if (Array.isArray(item.phones)) {
            item.phones.forEach((p: any) => {
              if (typeof p === 'string') {
                phonesList.push({ phone: p });
              } else if (p && typeof p === 'object') {
                phonesList.push({
                  phone: p.phone || p.wa_id || '',
                  type: p.type,
                  wa_id: p.wa_id
                });
              }
            });
          }

          return {
            name: displayName,
            phones: phonesList,
            vcard: typeof item.vcard === 'string' ? item.vcard : undefined
          };
        });

        return { type: 'contact', contacts };
      }
    } catch {
      // Not valid JSON, fall back to plain text
    }
  }

  return { type: 'text', text: content };
};

const handleDownloadVCard = (vcardText: string, contactName: string) => {
  try {
    let decodedVCard = vcardText;
    if (!vcardText.trim().startsWith('BEGIN:VCARD')) {
      try {
        decodedVCard = atob(vcardText);
      } catch {
        decodedVCard = vcardText;
      }
    }
    const blob = new Blob([decodedVCard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanName = contactName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'contact';
    link.setAttribute('download', `${cleanName}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to download vCard:', err);
  }
};

const renderTextWithLinks = (text: string) => {
  if (!text) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline break-all inline-flex items-center gap-0.5 font-semibold"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
          <ExternalLink className="h-3 w-3 inline shrink-0" />
        </a>
      );
    }
    return part;
  });
};

interface ChatMessageContentProps {
  content?: string | null;
  isSent?: boolean;
}

export const ChatMessageContent: React.FC<ChatMessageContentProps> = ({
  content,
  isSent = false
}) => {
  if (!content) return null;

  const parsed = parseMessageContent(content);

  if (parsed.type === 'contact') {
    return (
      <div className="space-y-2 my-1">
        {parsed.contacts.map((contact, idx) => {
          const waPhone =
            contact.phones.length > 0
              ? (contact.phones[0].wa_id || contact.phones[0].phone).replace(/\D/g, '')
              : '';

          return (
            <div
              key={idx}
              className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/[0.03] dark:bg-white/[0.05] min-w-[240px] max-w-[300px] shadow-sm"
            >
              {/* Header: Avatar + Contact Info */}
              <div className="p-3 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00a884]/15 dark:bg-[#00a884]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="h-5 w-5 text-[#075E54] dark:text-[#00a884]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    {contact.name}
                  </p>
                  {contact.phones.map((phoneItem, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 mt-1"
                    >
                      <Phone className="h-3 w-3 text-[#00a884] shrink-0" />
                      <span className="truncate">
                        {phoneItem.phone || phoneItem.wa_id}
                      </span>
                      {phoneItem.type && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-zinc-500 dark:text-zinc-400 uppercase">
                          {phoneItem.type}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="border-t border-black/10 dark:border-white/10 divide-x divide-black/10 dark:divide-white/10 flex bg-black/[0.02] dark:bg-white/[0.02]">
                {waPhone && (
                  <a
                    href={`https://wa.me/${waPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Message</span>
                  </a>
                )}
                {contact.vcard && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadVCard(contact.vcard!, contact.name);
                    }}
                    className="flex-1 py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Save Contact</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (parsed.type === 'location') {
    const { latitude, longitude, name, address, url } = parsed.location;
    const googleMapsUrl =
      url || (latitude != null && longitude != null ? `https://www.google.com/maps?q=${latitude},${longitude}` : '#');

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

  return <p className="whitespace-pre-wrap leading-relaxed">{renderTextWithLinks(parsed.text)}</p>;
};
