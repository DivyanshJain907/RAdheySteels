export function toCategorySlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeToken(token: string): string {
  if (token.length > 3 && token.endsWith("s")) {
    return token.slice(0, -1);
  }

  return token;
}

function getNormalizedTokens(value: string): string[] {
  return toCategorySlug(value)
    .split("-")
    .filter(Boolean)
    .map(normalizeToken);
}

function isSubset(small: Set<string>, large: Set<string>): boolean {
  for (const item of small) {
    if (!large.has(item)) return false;
  }

  return true;
}

export function isCategorySlugMatch(inputSlug: string, candidateCategory: string): boolean {
  const input = toCategorySlug(inputSlug);
  const candidate = toCategorySlug(candidateCategory);

  if (!input || !candidate) return false;
  if (input === candidate) return true;

  const inputTokens = new Set(getNormalizedTokens(input));
  const candidateTokens = new Set(getNormalizedTokens(candidate));

  return isSubset(inputTokens, candidateTokens) || isSubset(candidateTokens, inputTokens);
}

export function toTitleCase(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
