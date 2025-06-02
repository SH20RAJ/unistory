import Link from "next/link";

/**
 * Parse hashtags in text and return JSX with clickable hashtag links
 * @param {string} text - The text to parse
 * @param {string} className - Optional className for hashtag links
 * @returns {JSX.Element} - Parsed text with clickable hashtags
 */
export function parseHashtags(text, className = "text-blue-600 hover:text-blue-800 hover:underline font-medium") {
  if (!text) return "";

  // Regular expression to match hashtags (# followed by alphanumeric characters and underscores)
  const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
  
  // Split text by hashtags while keeping the hashtags
  const parts = text.split(hashtagRegex);
  
  const result = [];
  
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Regular text part
      if (parts[i]) {
        result.push(parts[i]);
      }
    } else {
      // Hashtag part (without the #)
      const hashtag = parts[i];
      result.push(
        <Link
          key={`hashtag-${i}-${hashtag}`}
          href={`/topic/${encodeURIComponent(hashtag)}`}
          className={className}
          onClick={(e) => e.stopPropagation()}
        >
          #{hashtag}
        </Link>
      );
    }
  }
  
  return result;
}

/**
 * Extract hashtags from text
 * @param {string} text - The text to extract hashtags from
 * @returns {string[]} - Array of hashtags (without the # symbol)
 */
export function extractHashtags(text) {
  if (!text) return [];
  
  const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
  const hashtags = [];
  let match;
  
  while ((match = hashtagRegex.exec(text)) !== null) {
    hashtags.push(match[1]);
  }
  
  return hashtags;
}

/**
 * Check if text contains hashtags
 * @param {string} text - The text to check
 * @returns {boolean} - True if text contains hashtags
 */
export function hasHashtags(text) {
  if (!text) return false;
  return /#([a-zA-Z0-9_]+)/g.test(text);
}
