/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ArchetypeType {
  POWERHOUSE = "Powerhouse",
  AEROBIC_ENGINE = "Aerobic Endurance Engine",
  EXPLOSIVE_HYBRID = "Explosive Hybrid",
  TECHNICAL_PRECISION = "Technical Precision",
  ADAPTIVE_STRATEGY = "Adaptive Strategy Athlete",
  MULTI_MODAL = "Multi-Modal Athlete"
}

export interface UserTraits {
  height: string;
  weight: string;
  endurance: number; // 1-10
  strength: number; // 1-10
  speed: number; // 1-10
  interests: string[];
}

export interface ArchetypeClassification {
  name: string;
  description: string;
  keyTraits: string[];
  sports: {
    olympic: string[];
    paralympic: string[];
  };
}

export interface ComparisonResult {
  closestArchetype: string;
  similarityScore: number;
  reasoning: string;
  alignedTraits: string[];
  gaps: string[];
  suggestions: string[];
}

export interface SimulationResult {
  updatedAlignment: string;
  shiftExplanation: string;
}

export interface Story {
  narrative: string;
}

export interface AthleteDNA {
  traitDistribution: { trait: string; value: number }[];
  clusters: string[];
  visualExplanation: string;
}

export interface TrainingZone {
  geography: string;
  reasoning: string;
  advantage: string;
}

export interface HistoricalTwin {
  era: string;
  reasoning: string;
  pattern: string;
}

export interface CrossSportIdentity {
  overlaps: { sport: string; reason: string }[];
}

export interface AdaptiveInsights {
  mobilityStrengths: string[];
  classificationExplanation: string;
  sportsAlignment: string[];
}

export interface FutureDrift {
  currentArchetype: string;
  futureShift: string;
  conditions: string;
}

export interface AllAnalysis {
  classification: ArchetypeClassification;
  comparison: ComparisonResult;
  story: Story;
  dna: AthleteDNA;
  trainingZone: TrainingZone;
  historicalTwin: HistoricalTwin;
  crossSportIdentity: CrossSportIdentity;
  adaptiveInsights: AdaptiveInsights;
  futureDrift: FutureDrift;
  audioScript: string;
}
