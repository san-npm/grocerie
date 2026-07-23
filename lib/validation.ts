/** Runtime validation for admin API payloads */

const LANGS = ['fr', 'en', 'de', 'lb'] as const;
const MAX_STRING_LENGTH = 2000;
const MAX_ARRAY_LENGTH = 1500;
const MAX_SHORT_FIELD = 200;

function isLangRecord(val: unknown): val is Record<string, string> {
  if (!val || typeof val !== 'object') return false;
  const obj = val as Record<string, unknown>;
  return LANGS.every(l => typeof obj[l] === 'string' && obj[l].length <= MAX_STRING_LENGTH);
}

function isOptionalLangRecord(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  return isLangRecord(val);
}

function isShortString(val: unknown): val is string {
  return typeof val === 'string' && val.length <= MAX_SHORT_FIELD;
}

function isOptionalShortString(val: unknown): boolean {
  if (val === undefined || val === null || val === '') return true;
  return isShortString(val);
}

function isFiniteNonNegativeNumber(val: unknown, max = 100_000): val is number {
  return typeof val === 'number' && Number.isFinite(val) && val >= 0 && val <= max;
}

export function validateWines(data: unknown): string | null {
  if (!Array.isArray(data)) return 'Expected an array';
  if (data.length > MAX_ARRAY_LENGTH) return `Too many items (max ${MAX_ARRAY_LENGTH})`;
  for (let i = 0; i < data.length; i++) {
    const w = data[i];
    if (!w || typeof w !== 'object') return `Item ${i}: not an object`;
    if (typeof w.id !== 'string' || w.id.length === 0 || w.id.length > MAX_SHORT_FIELD) {
      return `Item ${i}: invalid id`;
    }
    if (typeof w.name !== 'string' || w.name.length === 0 || w.name.length > MAX_SHORT_FIELD) {
      return `Item ${i}: invalid name`;
    }
    if (!isFiniteNonNegativeNumber(w.priceBottle)) return `Item ${i}: invalid priceBottle`;
    if (!isFiniteNonNegativeNumber(w.priceShop)) return `Item ${i}: invalid priceShop`;
    if (!isFiniteNonNegativeNumber(w.priceGlass)) return `Item ${i}: invalid priceGlass`;
    if (!isLangRecord(w.description)) return `Item ${i}: invalid description`;
  }
  return null;
}

export function validateMenu(data: unknown): string | null {
  if (!Array.isArray(data)) return 'Expected an array';
  if (data.length > MAX_ARRAY_LENGTH) return `Too many items (max ${MAX_ARRAY_LENGTH})`;
  for (let i = 0; i < data.length; i++) {
    const m = data[i];
    if (!m || typeof m !== 'object') return `Item ${i}: not an object`;
    if (typeof m.id !== 'string' || m.id.length === 0 || m.id.length > MAX_SHORT_FIELD) {
      return `Item ${i}: invalid id`;
    }
    if (!isFiniteNonNegativeNumber(m.price)) return `Item ${i}: invalid price`;
    if (!isLangRecord(m.name)) return `Item ${i}: invalid name`;
    if (!isLangRecord(m.description)) return `Item ${i}: invalid description`;
  }
  return null;
}

export function validateContent(data: unknown): string | null {
  if (!data || typeof data !== 'object') return 'Expected an object';
  const c = data as Record<string, unknown>;
  if (!isLangRecord(c.hours)) return 'Invalid hours';
  if (!isLangRecord(c.closedMessage)) return 'Invalid closedMessage';
  if (!isLangRecord(c.heroTagline)) return 'Invalid heroTagline';
  if (!isOptionalLangRecord(c.announcement)) return 'Invalid announcement';
  if (!isShortString(c.address)) return 'Invalid address';
  if (!isShortString(c.phone)) return 'Invalid phone';
  // Cheap RFC-5322-ish syntactic check — catches typos and CRLF garbage.
  if (typeof c.email !== 'string' || c.email.length > MAX_SHORT_FIELD || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) {
    return 'Invalid email';
  }
  // Social links are optional — legacy content objects may not have them.
  if (!isOptionalShortString(c.instagram)) return 'Invalid instagram';
  if (!isOptionalShortString(c.facebook)) return 'Invalid facebook';
  return null;
}
