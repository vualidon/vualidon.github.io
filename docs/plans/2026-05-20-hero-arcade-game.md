# Hero Section Arcade Game Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the Hero section 3D canvas background into an interactive arcade mini-game with score, health, hazard bombs, and high-score tracking.

**Architecture:** Combine high-performance Three.js WebGL rendering for 3D elements with React/Framer Motion overlay for the HUD and Game Over screens. Sync states via a thread-safe ref to prevent stale closures.

**Tech Stack:** React, Next.js, Framer Motion, Three.js, Tailwind CSS

---

## Proposed Changes

### Hero Section Game Code

#### [MODIFY] [HeroSection.tsx](file:///Users/quyetthang/Desktop/Desktop/project/vualidon.github.io/components/HeroSection.tsx)

### Task 1: Initialize Game State & References
Define React state variables and thread-safe refs in `HeroSection.tsx` to handle game state.

**Step 1.1: Add state variables and refs**
Add at the top of the `HeroSection` component:
```typescript
const [gameActive, setGameActive] = useState(false);
const [score, setScore] = useState(0);
const [hearts, setHearts] = useState(3);
const [gameOver, setGameOver] = useState(false);
const [highScore, setHighScore] = useState(0);

const gameStateRef = useRef({
    gameActive: false,
    score: 0,
    hearts: 3,
    gameOver: false,
    highScore: 0
});

// Sync ref with state updates
useEffect(() => {
    gameStateRef.current = { gameActive, score, hearts, gameOver, highScore };
}, [gameActive, score, hearts, gameOver, highScore]);

// Load high score on mount
useEffect(() => {
    const saved = localStorage.getItem('cyber_arcade_highscore');
    if (saved) {
        const val = parseInt(saved, 10);
        setHighScore(val);
    }
}, []);
```

### Task 2: Create Bomb Model & Collision Detection
Implement the `createBomb` helper and update click/touch listeners to detect and handle bomb hits.

**Step 2.1: Add `createBomb` helper function**
Add below `createDrone` (around line 429):
```typescript
const createBomb = () => {
    const bomb = new THREE.Group();

    // Central bomb core
    const coreGeometry = new THREE.SphereGeometry(0.08, 12, 12);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff0000),
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    bomb.add(core);

    // Spikes
    const spikeGeometry = new THREE.ConeGeometry(0.02, 0.08, 4);
    const spikeMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
    for (let i = 0; i < 6; i++) {
        const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
        if (i === 0) spike.position.y = 0.09;
        if (i === 1) { spike.position.y = -0.09; spike.rotation.x = Math.PI; }
        if (i === 2) { spike.position.x = 0.09; spike.rotation.z = -Math.PI / 2; }
        if (i === 3) { spike.position.x = -0.09; spike.rotation.z = Math.PI / 2; }
        if (i === 4) { spike.position.z = 0.09; spike.rotation.x = Math.PI / 2; }
        if (i === 5) { spike.position.z = -0.09; spike.rotation.x = -Math.PI / 2; }
        bomb.add(spike);
    }

    // Outer wireframe
    const outerGeometry = new THREE.OctahedronGeometry(0.12);
    const outerMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff3300),
        wireframe: true
    });
    const outer = new THREE.Mesh(outerGeometry, outerMaterial);
    bomb.add(outer);

    // Hitbox
    const hitboxGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const hitboxMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
    hitbox.userData = { isHitbox: true };
    bomb.add(hitbox);

    bomb.userData = {
        type: 'bomb',
        color: new THREE.Color(0xff0000)
    };

    return bomb;
};
```

**Step 2.2: Update collision detection**
Modify `handleClick` and `handleTouch` to check intersection with bombs. If it's a spaceship or drone, add to score. If it's a bomb, deduct a heart. If hearts reach 0, set `gameOver` to true.
Ensure that the very first successful click on any ship/drone calls `setGameActive(true)`.

### Task 3: Spawning & Movement Loop in Game Mode
Modify the Three.js render loop to handle active game spawning (up to 3 ships, 2 drones, and 2 bombs).

**Step 3.1: Add `bombsRef`**
Add `const bombsRef = useRef<THREE.Group[]>([]);` at the top.

**Step 3.2: Implement game mode spawn rates and movement**
Update `animate()` to:
* Increase the speed multiplier of ships and drones when `gameStateRef.current.gameActive` is true.
* Move bombs horizontally using a wavy sine trajectory:
  ```typescript
  bomb.position.x += bomb.userData.speed * bomb.userData.direction;
  bomb.position.y = bomb.userData.baseY + Math.sin(Date.now() * 0.003 + bomb.userData.offset) * 0.4;
  ```
* Implement immediate respawns for all objects when they are destroyed or go off-screen, maintaining the required object counts.

### Task 4: HUD & Game Over UI Overlays
Render the gameplay interface and GameOver modal on top of the Three.js Canvas.

**Step 4.1: Hide original Hero Text in Game Mode**
Update the main `motion.div` representing the name and details to render only when `!gameActive`.

**Step 4.2: Implement HUD and Game Over screen**
Add the layout JSX:
* HUD: Rendered absolutely at the top of the container when `gameActive && !gameOver`. Shows Score, 3 neon pink hearts (grey out lost ones), and a Quit button.
* Game Over: Rendered absolutely at the center when `gameOver`. Shows final score, high score (with `[ NEW RECORD ]` if applicable), and a `[ REDEPLOY ]` replay button.

---

## Verification Plan

### Manual Verification
1. Open local page `http://localhost:3000`.
2. Click a spaceship or drone. Verify that:
   - The hero text fades out.
   - The HUD with Score and 3 hearts appears.
   - Spaceships, drones, and bombs start spawning.
3. Click a bomb. Verify that a heart is lost (fades out) and a red explosion occurs.
4. Click a few more spaceships/drones. Verify that score increments.
5. Hit three bombs total. Verify that the "Game Over" screen is shown with final score and high score.
6. Click `[ REDEPLOY ]`. Verify the game restarts with a reset score and 3 hearts.
7. Click `[ QUIT ]` in the HUD during a game. Verify the game resets and returns to the normal portfolio screen.
