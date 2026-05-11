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
    
    // Calculate pseudo-dynamic values based on traits
    const isExplocive = traits.speed > 7 || traits.strength > 7;
    const isEndurance = traits.endurance > 7;
    const name = isExplocive ? "Precision Vanguard" : isEndurance ? "Aerobic Engine" : "Versatile Catalyst";
    const score = 80 + Math.floor(Math.random() * 15);

    return {
      classification: {
        name: name,
        description: `Based on your traits (S:${traits.strength}, Sp:${traits.speed}, E:${traits.endurance}), you possess a profile matching ${isExplocive ? "short-burst power specialists" : "sustained output legends"}.`,
        keyTraits: isExplocive ? ["Explosive", "Reactive", "Powerful"] : ["Efficient", "Resilient", "Steady"],
        sports: {
          olympic: isExplocive ? ["Weightlifting", "Short Track"] : ["Marathon", "Triathlon"],
          paralympic: isExplocive ? ["Shot Put", "T54 Sprint"] : ["Para-Cycling", "Wheelchair Racing"]
        }
      },
      comparison: {
        closestArchetype: isExplocive ? "The Bolt" : "The Pacer",
        similarityScore: score,
        reasoning: `Your ${isExplocive ? "power-to-weight" : "oxidative capacity"} markers are highly characteristic of the ${isExplocive ? "1980s power era" : "modern endurance wave"}.`,
        alignedTraits: isExplocive ? ["Fast-Twitch Drive", "Peak Torque"] : ["V02 Threshold", "Mental Pacing"],
        gaps: isExplocive ? ["Aerobic Floor"] : ["Anaerobic Burst"],
        suggestions: ["Incorporate interval contrast training", "Optimize recovery nutrition"]
      },
      story: {
        narrative: `You are a reflection of the ${isExplocive ? "explosive pioneers" : "endurance architects"} who redefined the Games in the ${isExplocive ? "mid-80s" : "late-90s"}.`
      },
      dna: {
        traitDistribution: [
          { trait: "Explosiveness", value: traits.speed },
          { trait: "Endurance", value: traits.endurance },
          { trait: "Strength", value: traits.strength },
          { trait: "Adaptability", value: 7 }
        ],
        clusters: [isExplocive ? "Power Cluster" : "Stamina Cluster"],
        visualExplanation: "Your DNA vector highlights a specific specialization in high-output performance metrics."
      },
      trainingZone: {
        geography: isExplocive ? "Chula Vista, CA" : "Colorado Springs, CO",
        reasoning: "Matched to your specific metabolic recovery patterns.",
        advantage: "Access to elite historical data mirrors."
      },
      historicalTwin: {
        era: isExplocive ? "The Golden Power Era" : "The Endurance Revolution",
        reasoning: "Matches biometric data from the archives.",
        pattern: "Sustained Technical Mastery"
      },
      crossSportIdentity: {
        overlaps: [
          { sport: isExplocive ? "Bobsleigh" : "Swimming", reason: "Direct biomechanical transferability." }
        ]
      },
      adaptiveInsights: {
        mobilityStrengths: ["Joint stability", "Reactive force"],
        classificationExplanation: "Your profile provides optimal energy return for adaptive track events.",
        sportsAlignment: ["Para-Athletics", "Cycling"]
      },
      futureDrift: {
        currentArchetype: name,
        futureShift: "Hybrid Specialist",
        conditions: "Requires cross-discipline volume increase."
      },
      audioScript: `Your data mirror sync is complete. You have been classified as a ${name} with a ${score} percent similarity to historical Team USA clusters. Your profile shows specific strength in your performance vectors.`
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
