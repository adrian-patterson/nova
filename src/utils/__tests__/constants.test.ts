import {
  SWIPE_EDGE_THRESHOLD,
  SWIPE_DISTANCE_THRESHOLD,
  SWIPE_MOVE_THRESHOLD,
  KEYBOARD_OFFSET_PORTRAIT,
  KEYBOARD_OFFSET_LANDSCAPE,
  LOADING_BAR_COLOR,
} from '../constants';

describe('constants', () => {
  describe('Swipe gesture constants', () => {
    it('should have positive threshold values', () => {
      expect(SWIPE_EDGE_THRESHOLD).toBeGreaterThan(0);
      expect(SWIPE_DISTANCE_THRESHOLD).toBeGreaterThan(0);
      expect(SWIPE_MOVE_THRESHOLD).toBeGreaterThan(0);
    });

    it('should have reasonable swipe threshold values', () => {
      expect(SWIPE_EDGE_THRESHOLD).toBeLessThan(100);
      expect(SWIPE_DISTANCE_THRESHOLD).toBeLessThan(200);
    });
  });

  describe('Keyboard offset constants', () => {
    it('should have negative offset values', () => {
      expect(KEYBOARD_OFFSET_PORTRAIT).toBeLessThan(0);
      expect(KEYBOARD_OFFSET_LANDSCAPE).toBeLessThan(0);
    });

    it('should have portrait offset greater than landscape', () => {
      expect(Math.abs(KEYBOARD_OFFSET_PORTRAIT)).toBeGreaterThan(
        Math.abs(KEYBOARD_OFFSET_LANDSCAPE)
      );
    });
  });

  describe('Color constants', () => {
    it('should have valid hex color format', () => {
      expect(LOADING_BAR_COLOR).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });
});
