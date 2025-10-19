import { isUrl, formatUrl } from '../urlHelpers';

describe('urlHelpers', () => {
  describe('isUrl', () => {
    it('should return true for URLs with http protocol', () => {
      expect(isUrl('http://example.com')).toBe(true);
    });

    it('should return true for URLs with https protocol', () => {
      expect(isUrl('https://example.com')).toBe(true);
    });

    it('should return true for domain-like strings with dots', () => {
      expect(isUrl('example.com')).toBe(true);
      expect(isUrl('www.example.com')).toBe(true);
      expect(isUrl('subdomain.example.com')).toBe(true);
    });

    it('should return false for strings with spaces', () => {
      expect(isUrl('example com')).toBe(false);
      expect(isUrl('hello world')).toBe(false);
    });

    it('should return false for strings without dots', () => {
      expect(isUrl('example')).toBe(false);
      expect(isUrl('search query')).toBe(false);
    });

    it('should return false for empty strings', () => {
      expect(isUrl('')).toBe(false);
    });
  });

  describe('formatUrl', () => {
    it('should return empty string for empty input', () => {
      expect(formatUrl('')).toBe('');
      expect(formatUrl('   ')).toBe('');
    });

    it('should preserve URLs with http protocol', () => {
      expect(formatUrl('http://example.com')).toBe('http://example.com');
    });

    it('should preserve URLs with https protocol', () => {
      expect(formatUrl('https://example.com')).toBe('https://example.com');
    });

    it('should add https:// to domain-like strings', () => {
      expect(formatUrl('example.com')).toBe('https://example.com');
      expect(formatUrl('www.example.com')).toBe('https://www.example.com');
    });

    it('should trim whitespace from URLs', () => {
      expect(formatUrl('  example.com  ')).toBe('https://example.com');
      expect(formatUrl('  https://example.com  ')).toBe('https://example.com');
    });

    it('should create Brave search URL for search queries (default)', () => {
      expect(formatUrl('hello world')).toBe('https://search.brave.com/search?q=hello%20world');
      expect(formatUrl('search query')).toBe('https://search.brave.com/search?q=search%20query');
    });

    it('should encode special characters in search queries', () => {
      expect(formatUrl('test@#$%')).toBe('https://search.brave.com/search?q=test%40%23%24%25');
    });

    it('should create Brave search for single words without dots', () => {
      expect(formatUrl('example')).toBe('https://search.brave.com/search?q=example');
    });

    it('should use DuckDuckGo when specified', () => {
      expect(formatUrl('hello world', 'duckduckgo')).toBe('https://duckduckgo.com/?q=hello%20world');
    });

    it('should use Google when specified', () => {
      expect(formatUrl('hello world', 'google')).toBe('https://www.google.com/search?q=hello%20world');
    });

    it('should use Ecosia when specified', () => {
      expect(formatUrl('hello world', 'ecosia')).toBe('https://www.ecosia.org/search?q=hello%20world');
    });
  });
});
