import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the Gemini SDK
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(function() {
      return {
        models: {
          get: vi.fn(),
          generateContent: vi.fn(),
        }
      };
    }),
  };
});
