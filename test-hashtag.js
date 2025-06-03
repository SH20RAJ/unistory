// Test hashtag regex functionality
const testContent1 = "This is a great post about #technology and #innovation!";
const testContent2 = "Just a regular post without any hashtags.";
const testContent3 = "Multiple #hashtags in #one #post #amazing";

function extractHashtags(text) {
  if (!text) return [];
  const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
  const matches = [];
  let match;

  while ((match = hashtagRegex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}

function hasHashtags(text) {
  if (!text) return false;
  const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
  return hashtagRegex.test(text);
}

console.log("Testing hashtag extraction:");
console.log("Content 1:", testContent1);
console.log("Extracted hashtags:", extractHashtags(testContent1));
console.log("Has hashtags:", hasHashtags(testContent1));
console.log();

console.log("Content 2:", testContent2);
console.log("Extracted hashtags:", extractHashtags(testContent2));
console.log("Has hashtags:", hasHashtags(testContent2));
console.log();

console.log("Content 3:", testContent3);
console.log("Extracted hashtags:", extractHashtags(testContent3));
console.log("Has hashtags:", hasHashtags(testContent3));
