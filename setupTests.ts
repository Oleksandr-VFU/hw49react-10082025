// setupTests.ts
import { vi, beforeAll } from 'vitest';

vi.spyOn(console, 'error').mockImplementation((msg) => {
  if (
    typeof msg === 'string' &&
    msg.includes('not wrapped in act(...)')
  ) return;
  console.error(msg);
});

beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
});