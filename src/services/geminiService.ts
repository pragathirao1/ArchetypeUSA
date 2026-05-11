import { GoogleGenAI } from "@google/genai";
import { UserTraits, AllAnalysis, SimulationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const MODEL_NAME = "gemini-3-flash-preview";

const SYSTEM_PROMPT = `You are the core AI engine for "Archetype USA".
This is a platform connecting users to Olympic and Paralympic athlete archetypes using 120 years of Team USA data (1896-2026).

ROLES: Sports intelligence analyst, AI coach, Data storyteller, Accessibility-first assistant.

CORE FEATURES TO RETURN IN JSON:
1. Athlete Archetype Engine (Name, Desc, Traits, Sports)
2. Compare Me to Team USA (Similarity Score, Aligned, Gaps, Suggestions)
3. What-If Simulation
4. Story Mode Generator (5-7 line narrative)
5. Athlete DNA Graph (Trait distribution summary, clusters, visual explanation)
6. Where You Would Train (Geography, reasoning, advantage)
7. Historical Twin Finder (Era cluster match, reasoning, pattern)
8. Cross-Sport Identity (2-4 sport overlaps, why they overlap)
9. Adaptive Ability Translator (Mobility strengths, classification, alignment)
10. Future Archetype Drift (Current, future shift, conditions)

RULES:
- NEVER guarantee outcomes or success. Use "could", "may", "might".
- Treat Olympic and Paralympic data with equal importance.
- ACCESSIBILITY: Provide a "audioScript" field with a simplified spoken version (natural flow, no symbols/code/markdown).

Return format MUST be JSON only.`;

export async function analyzeBiometrics(traits: UserTraits): Promise<AllAnalysis> {
  const prompt = `Analyze these user traits: ${JSON.stringify(traits)}
  
  Generate a full "Archetype USA" report including all 10 core features plus the audio script.
  
  Return format:
  {
    "classification": { "name": "...", "description": "...", "keyTraits": [], "sports": { "olympic": [], "paralympic": [] } },
    "comparison": { "closestArchetype": "...", "similarityScore": 85, "reasoning": "...", "alignedTraits": [], "gaps": [], "suggestions": [] },
    "story": { "narrative": "..." },
    "dna": { "traitDistribution": [{ "trait": "Strength", "value": 7 }], "clusters": [], "visualExplanation": "..." },
    "trainingZone": { "geography": "...", "reasoning": "...", "advantage": "..." },
    "historicalTwin": { "era": "...", "reasoning": "...", "pattern": "..." },
    "crossSportIdentity": { "overlaps": [{ "sport": "...", "reason": "..." }] },
    "adaptiveInsights": { "mobilityStrengths": [], "classificationExplanation": "...", "sportsAlignment": [] },
    "futureDrift": { "current": "...", "futureShift": "...", "conditions": "..." },
    "audioScript": "..."
  }`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [SYSTEM_PROMPT, prompt],
    config: {
      responseMimeType: "application/json"
    }
  });

  const responseText = response.text;
  if (!responseText) throw new Error("Invalid AI response");
  return JSON.parse(responseText.trim());
}

export async function runSimulation(traits: UserTraits, changes: string): Promise<SimulationResult & { audioScript?: string }> {
  const prompt = `Current Traits: ${JSON.stringify(traits)}
  Hypothetical Change: ${changes}
  
  Provide a what-if simulation including an audio script for accessibility:
  {
    "updatedAlignment": "Potential new archetype or shift percentage",
    "shiftExplanation": "Analytical explanation using conditional reasoning",
    "audioScript": "simplified spoken version for accessibility"
  }`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [SYSTEM_PROMPT, prompt],
    config: {
      responseMimeType: "application/json"
    }
  });

  const responseText = response.text;
  if (!responseText) throw new Error("Invalid AI response");
  return JSON.parse(responseText.trim());
}
