# Google Cloud Integration Proof — Archetype USA

This file demonstrates how Archetype USA uses Google Cloud services and Gemini API.

---

## 1. Gemini API Integration

The backend uses Google’s Generative Language API:

```javascript
const response = await fetch(
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=API_KEY",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: "Analyze athlete archetype alignment" }]
        }
      ]
    })
  }
);
```

## 2. Google Cloud Services Used
- **Google AI Studio** (Gemini API key generation)
- **Google Cloud Run** (deployment)
- **Vertex AI / Generative Language API** (model inference)

## 3. Example Output
The system returns structured responses such as:
- Athlete Archetype classification
- Similarity scoring
- Adaptive sports insights
- What-if simulations

## 4. Purpose of Cloud Integration
Google Cloud enables:
- scalable AI inference
- secure API handling
- real-time reasoning with Gemini
