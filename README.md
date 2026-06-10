# MoveNest

MoveNest is a clickable mobile web prototype for a gentle home workout app. The demo is designed for a product manager written assignment around an AI x health content tool, with a focus on helping busy urban women find and complete a low-pressure first workout within one minute.

## How to Run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

Useful checks:

```bash
npm run build
npm run lint
```

## Demo Pages

The prototype uses React state instead of a router and supports this full flow:

1. Welcome / Login
2. Home
3. Workout Detail
4. Active Workout
5. Completion

## Product Design Notes

MoveNest is positioned as a calm, premium European wellness product rather than a high-pressure fitness app. The interface uses warm ivory, sage green, soft coral, rounded mobile surfaces, and restrained motion to create a supportive first-use experience.

The core product logic is intentionally narrow: understand the user's energy and constraints, recommend one suitable short session, allow in-workout difficulty feedback, and close the loop with a simple post-workout feeling check. The AI personalization is expressed through adaptive copy and UI states rather than exaggerated claims.
