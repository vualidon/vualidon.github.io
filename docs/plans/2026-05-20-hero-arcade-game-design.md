# Design Document: Hero Section Arcade Game Upgrade

**Date:** 2026-05-20  
**Author:** Antigravity AI  
**Topic:** Retrograding the cyberpunk hero section background into an interactive arcade mini-game.

## Overview
This document specifies the upgrade of the portfolio's Hero section background from a passive interactive canvas (clicking ships to explode them) to a fully-featured mini-game featuring scoring, health (hearts), hazardous bombs, high-score tracking via local storage, and a dedicated Game Over / Replay flow.

---

## 1. Architecture & State Management
We will use a hybrid React + Three.js pattern where the 3D rendering context (Canvas, WebGL elements) runs in Three.js, and the user interface overlays (HUD, Game Over, buttons) are rendered in React/CSS.

### State Structure
We will manage the game state using React state hooks, mirrored in a `useRef` to allow the asynchronous Three.js click handler to read up-to-date values without stale closures.

```typescript
// React States
const [gameActive, setGameActive] = useState(false);
const [score, setScore] = useState(0);
const [hearts, setHearts] = useState(3);
const [gameOver, setGameOver] = useState(false);
const [highScore, setHighScore] = useState(0);

// Thread-safe ref for Three.js context access
const gameStateRef = useRef({
    gameActive: false,
    score: 0,
    hearts: 3,
    gameOver: false,
    highScore: 0
});
```

* **Transitioning to Game Mode:** When the user clicks their first spaceship or drone, `gameActive` becomes `true`. The main portfolio texts fade out.
* **Score Increment:** Hitting a spaceship/drone adds 1 point.
* **Heart Decrement:** Hitting a bomb removes 1 heart.
* **Game Over:** Triggered when `hearts` reaches `0`.

---

## 2. 3D Elements & Spawning Logic

### The Bomb Model
We will create a new type of target, `bomb`, using Three.js primitives:
* **Geometry:** A grey sphere (radius 0.08) surrounded by a red wireframe octahedron and several small red cone spikes pointing outward.
* **Behavior:** A slow pulsating red glow on its core. It will float along a sine-wave path:
  $$y = y_{base} + A \cdot \sin(\omega \cdot t)$$
* **Click Event:** Clicking a bomb will create a large red/orange explosion particle effect, vibrate the device, and deduct 1 heart.

### Spawning Rates
* **Normal Mode (Background):**
  * Spawns 2–4 ships, 1–3 drones.
  * Low speed, no bombs.
* **Game Mode:**
  * Spawns up to 3 ships, 2 drones, and 2 bombs.
  * Trajectories move 1.5x faster.
  * If a target is destroyed or leaves the screen, a new one of its type is respawned immediately.

---

## 3. User Interface (HUD & Overlays)

### The Gameplay HUD
Positioned at the top of the Hero section:
* **Score Box (Top-Left):** Cyan glowing panel reading `SCORE: [value]`.
* **Hearts (Top-Right):** 3 neon pink hearts (`❤️ ❤️ ❤️`). Faded hearts are rendered with lower opacity and grey tint.
* **Quit Button (Top-Center):** `[ QUIT ]` to end the game and return to the static landing page.

### The Game Over Panel
Centered full-screen layout:
* Glassmorphism background (`backdrop-blur-lg bg-black/75`).
* Title: `SYSTEM CRITICAL // GAME OVER` in blinking neon red.
* Stats display: Current Score and High Score (read/written to `localStorage` key `cyber_arcade_highscore`).
* If the user beats their high score, show a `NEW RECORD!` blinking text.
* A button labeled `[ REDEPLOY ]` that resets the game state.
