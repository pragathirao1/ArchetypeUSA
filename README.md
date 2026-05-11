# Archetype USA

**Historical athlete archetype engine connecting your traits to 120 years of Team USA excellence (1896-2026).**

Archetype USA is an analytical mirror that connects your unique physical and mental traits to a century of elite performance clusters. By leveraging multidimensional analysis, the application classifies users into specific athletic archetypes and provides insights into training zones, historical twins, and adaptive sports alignment.

## Core Features

- **AI-Powered Archetype Classification**: Using Gemini 2.0 Flash to map user traits (Strength, Speed, Endurance, Adaptability) to historical Team USA clusters.
- **Historical Data Comparison**: Direct comparison against verified performance metrics from 1896 to 2026.
- **What-If Simulations**: Simulate how lifestyle or training changes (e.g., altitude, diet, volume) would pivot your biometric alignment.
- **Accessibility-First Design**: Full audio narrative support for results, ensuring an inclusive experience for all athletes.
- **US Center of Excellence Directory**: A regional hub directory for elite training facilities across the United States.

## Tech Stack

- **Frontend**: React 18 with Vite, TypeScript, and Tailwind CSS.
- **Animations**: Framer Motion for high-fidelity state transitions.
- **Testing**: Vitest and React Testing Library for reproducible unit testing.
- **Backend**: Node.js with Express (Full-Stack architecture).
- **AI Engine**: Google Gemini AI Studio (Gemini 2.0 Flash) for biometric synthesis and predictive simulations.
- **Deployment**: Google Cloud Run.

## Reproducible Testing

Archetype USA includes a suite of automated tests to ensure the integrity of the biometric analysis logic and AI fallback mechanisms.

### Running Tests Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Unit Tests**:
   Execute the Vitest suite to verify the classification engine:
   ```bash
   npm test
   ```

3. **Continuous Integration**:
   The `npm test` command runs in CI mode (`vitest run`), ensuring that any changes to the core algorithms are validated against historical markers before deployment.

### Test Coverage

Current tests cover:
- **Biometric Fallback Logic**: Ensuring the application remains functional even if the Gemini API is inaccessible.
- **Archetype Accuracy**: Validating that power-dominant and endurance-dominant traits correctly map to their respective historical clusters (e.g., "Precision Vanguard" vs "Aerobic Engine").

## Implementation Details: Gemini AI Studio

Archetype USA utilizes the `@google/genai` SDK to interact with **Gemini 2.0 Flash**. The AI is tasked with:
1. **Multidimensional Synthesis**: Taking user biometrics and "syncing" them with a simulated historical database to find the closest statistical match.
2. **Context-Aware Simulation**: Predicting metabolic and biomechanical shifts based on natural language training descriptions.
3. **Audio Generation**: Crafting persona-driven scripts for the application's audio playback feature.

## License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](./LICENSE) file for details.

## Repository

Public Repository URL: [Insert Your Repository URL Here]
