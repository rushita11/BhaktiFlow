# Radha Naam Jaap — React + Vite

A component-based React conversion of the original HTML application with a redesigned mobile-first interface.

## Routes

- `/` — Home and mantra selection
- `/jaap` — Active Jaap counter
- `/summary` — Completed session summary
- `/history` — Saved session history

## Run the project

```bash
npm install
npm run dev
```

## Audio files

The application is ready to use these optional files:

- `public/audio/radha.mp3`
- `public/audio/krishna.mp3`
- `public/audio/ram.mp3`
- `public/audio/sita.mp3`
- `public/audio/shiva.mp3`

Copy your existing MP3 files into the `public/audio` folder and rename them as listed. The counter still works when audio files are missing.

## Important behavior

- One complete mala is configured as **108 Jaap** in `src/context/JaapContext.jsx`.
- Jaap totals, selected mantra, wallpapers, mute setting, and session history are saved in `localStorage`.
- Tap the main counter, use the JAAP button, or press Space/Enter to increment.
