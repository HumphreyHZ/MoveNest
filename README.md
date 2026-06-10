# MoveNest

Online demo: [https://humphreyhz.github.io/MoveNest/](https://humphreyhz.github.io/MoveNest/)

MoveNest is a clickable mobile web prototype for a gentle home workout product. It explores one narrow product hypothesis: whether a clear recommendation, low-impact explanation, and in-workout control can help a busy first-time user start a short home session with less hesitation.

The prototype uses rules and React state to simulate personalization; it does not connect to a real AI model or health data service.

## Project Documents

- [Project overview](docs/project-overview.md)
- [Product requirements](docs/prd.md)
- [Research and competitor review](docs/research.md)
- [AI process and review method](docs/ai-process.md)

## How to Run

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

Quality checks:

```bash
npm run build
npm run lint
```

## Demo Walkthrough

1. Start as a guest.
2. Change the Home check-in options and observe the explanation text.
3. Open a recommended or alternative class.
4. Review duration, intensity, goals, and movement previews.
5. Start the workout and try Pause, Skip, and Too hard.
6. Complete the workout, select feedback, and save the simulated next plan.

## Product Scope

The prototype supports five screens:

1. Welcome
2. Home
3. Workout Detail
4. Active Workout
5. Completion

The experience is intentionally narrow: recommend a short session, explain why it may fit, give the user control during training, and collect a simple post-workout signal.

## Current Limitations

- Check-in selections change explanatory copy but do not change the default recommendation.
- Too hard displays a response but does not replace or shorten the next movement.
- Feedback is not persisted and does not train or call a model.
- Save tomorrow's plan returns to Home; it does not create a real schedule.
- There is no authentication, backend, analytics, or medical screening.
- Image source and licensing records must be confirmed before public or commercial use.

## Technology

- React
- Vite
- Tailwind CSS
- Lucide React

The app uses local static data and React state instead of a router or backend. This keeps the prototype easy to run and evaluate while making the product limitations explicit.
