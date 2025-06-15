import { isValidEmail } from '@/lib/validators';

describe('isValidEmail', () => {
  it('returns true for valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('returns false for invalid email', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
  });
});