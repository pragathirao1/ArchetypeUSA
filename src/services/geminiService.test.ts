import { describe, it, expect, vi } from 'vitest';
import { analyzeBiometrics } from '../services/geminiService';

describe('geminiService', () => {
  it('should return fallback data when API fails or is not configured', async () => {
    const traits = {
      strength: 5,
      speed: 5,
      endurance: 5,
      adaptability: 5
    };

    // We expect the fallback logic to kick in if we don't mock a successful response
    const result = await analyzeBiometrics(traits);
    
    expect(result).toHaveProperty('classification');
    expect(result.classification).toHaveProperty('name');
    expect(result).toHaveProperty('comparison');
    expect(result).toHaveProperty('dna');
  });

  it('should correctly classify explosive traits', async () => {
    const traits = {
      strength: 9,
      speed: 9,
      endurance: 2,
      adaptability: 5
    };

    const result = await analyzeBiometrics(traits);
    
    // Check if the fallback uses the logic we implemented in geminiService
    expect(result.classification.name).toBe('Precision Vanguard');
  });

  it('should correctly classify endurance traits', async () => {
    const traits = {
      strength: 2,
      speed: 2,
      endurance: 9,
      adaptability: 5
    };

    const result = await analyzeBiometrics(traits);
    
    expect(result.classification.name).toBe('Aerobic Engine');
  });
});
