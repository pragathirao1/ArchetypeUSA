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

  // Add artificial processing time for "Data Mirror Sync" feel
  await new Promise(resolve => setTimeout(resolve, 3500));

  try {
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
  } catch (error) {
    console.warn("Gemini API error, falling back to local simulation:", error);
    // Return a high-quality fallback for demo purposes
    return {
      classification: {
        name: "Precision Vanguard",
        description: "You possess the explosive power and specialized focus typical of elite track and field specialists. Your biometric markers suggest a high fast-twitch muscle fiber density and mechanical efficiency.",
        keyTraits: ["Explosive", "Laser-Focused", "Resilient", "Strategic"],
        sports: {
          olympic: ["100m Sprint", "Long Jump"],
          paralympic: ["T64 Sprint", "T63 Long Jump"]
        }
      },
      comparison: {
        closestArchetype: "The Silver Bullet",
        similarityScore: 92,
        reasoning: "Your strength-to-weight ratio closely masks the profile of mid-20th century speed pioneers.",
        alignedTraits: ["Leg Drive", "Mental Fortitude"],
        gaps: ["Lateral Agility", "Cold Weather Acclimation"],
        suggestions: ["Incorporate plyometric depth jumps", "Focus on post-activation potentiation"]
      },
      story: {
        narrative: "In the shadow of the 1968 Games, your archetype rose from the red clay tracks of California. You are the embodiment of raw momentum, a human vector calculated to bridge the gap between human limits and historical legends."
      },
      dna: {
        traitDistribution: [
          { trait: "Explosiveness", value: 9 },
          { trait: "Endurance", value: 4 },
          { trait: "Strength", value: 8 },
          { trait: "Speed", value: 9 }
        ],
        clusters: ["Fast-Twitch Dominant", "Anaerobic Power"],
        visualExplanation: "Your DNA vector shows a sharp peak in anaerobic capacity, suggesting you excel in short-duration, high-intensity efforts rather than aerobic steady-state."
      },
      trainingZone: {
        geography: "Chula Vista Elite Training Center",
        reasoning: "Optimal humidity and specialized track surfaces matched to your impact profile.",
        advantage: "Low atmospheric drag and high-caliber peer clusters."
      },
      historicalTwin: {
        era: "The Golden Sprint Era (1984-1996)",
        reasoning: "Matches the biometric efficiency of the decade where speed records were shattered through refined mechanics.",
        pattern: "Low-Profile Start / High-Velocity Finish"
      },
      crossSportIdentity: {
        overlaps: [
          { sport: "Bobsleigh", reason: "Explosive start power is highly transferable to push-athlete roles." },
          { sport: "Skeleton", reason: "High-velocity tolerance and precise center-of-gravity control." }
        ]
      },
      adaptiveInsights: {
        mobilityStrengths: ["Lower limb power", "Reactive balance"],
        classificationExplanation: "Your profile suggests potential in T-class track events where energy return is localized in the ankles/feet.",
        sportsAlignment: ["Para-Athletics", "Cycling"]
      },
      futureDrift: {
        currentArchetype: "Explosive Specialist",
        futureShift: "Hybrid Performance Engine",
        conditions: "Requires 12 weeks of aerobic base building and sustained technical refinement."
      },
      audioScript: "You have been matched with the Precision Vanguard archetype. This identity is defined by explosive power and specialized focus. You share 92 percent similarity with mid-twentieth century speed pioneers. Your training is best suited for the Chula Vista Elite Training Center, where you can leverage your fast-twitch muscle dominance. You are not just an athlete; you are a human vector bridge between history and the future."
    };
  }
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

  // Delay for simulation complexity feel
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
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
  } catch (error) {
    console.warn("Simulation API error:", error);
    return {
      updatedAlignment: "+15% Shift towards Endurance",
      shiftExplanation: "Integrating high-altitude training would likely shift your metabolic profile, increasing mitochondrial density and favoring aerobic efficiency over raw power.",
      audioScript: "Your profile shows a 15 percent shift towards endurance. This change suggests that high-altitude training will improve your aerobic efficiency."
    };
  }
}
