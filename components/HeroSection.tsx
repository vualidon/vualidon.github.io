'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Explosion particle effect
const createExplosion = (position: THREE.Vector3, color: THREE.Color) => {
    const group = new THREE.Group();

    // Core flash - intense bright flash at the center
    const coreFlashGeometry = new THREE.SphereGeometry(0.25, 24, 24);
    const coreFlashMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1
    });
    const coreFlash = new THREE.Mesh(coreFlashGeometry, coreFlashMaterial);
    coreFlash.userData = {
        isFlash: true,
        initialScale: 1,
        maxScale: 2,
        decay: 0.15
    };
    group.add(coreFlash);

    // EMP wave effect - a thin expanding ring with the object's color
    const empGeometry = new THREE.RingGeometry(0.05, 0.06, 32);
    const empMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
    });
    const emp = new THREE.Mesh(empGeometry, empMaterial);
    emp.userData = {
        isEMP: true,
        initialScale: 1,
        expansionRate: 0.25, // Fast expansion
        decay: 0.03
    };
    group.add(emp);

    // Shockwave ring - expanding ring from the explosion center
    const shockwaveGeometry = new THREE.RingGeometry(0.1, 0.15, 32);
    const shockwaveMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
    });
    const shockwave = new THREE.Mesh(shockwaveGeometry, shockwaveMaterial);
    shockwave.userData = {
        isShockwave: true,
        initialScale: 1,
        expansionRate: 0.15,
        decay: 0.05
    };
    group.add(shockwave);

    // Secondary shockwave with color
    const colorShockwaveGeometry = new THREE.RingGeometry(0.05, 0.1, 32);
    const colorShockwaveMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
    });
    const colorShockwave = new THREE.Mesh(colorShockwaveGeometry, colorShockwaveMaterial);
    colorShockwave.userData = {
        isShockwave: true,
        initialScale: 1,
        expansionRate: 0.12,
        decay: 0.04
    };
    group.add(colorShockwave);

    // Fire ball - central glowing sphere
    const fireballGeometry = new THREE.SphereGeometry(0.15, 24, 24);
    const fireballMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff5500),
        transparent: true,
        opacity: 0.9
    });
    const fireball = new THREE.Mesh(fireballGeometry, fireballMaterial);
    fireball.userData = {
        isFireball: true,
        initialScale: 1,
        maxScale: 2,
        decay: 0.08
    };
    group.add(fireball);

    // Secondary explosions - smaller explosions that occur after the main one
    const secondaryExplosionCount = 3;
    for (let i = 0; i < secondaryExplosionCount; i++) {
        // Create a small sphere that will expand and then disappear
        const secExpGeometry = new THREE.SphereGeometry(0.05, 12, 12);
        const secExpMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0xff3300),
            transparent: true,
            opacity: 0.8
        });
        const secExp = new THREE.Mesh(secExpGeometry, secExpMaterial);

        // Position randomly but not too far from center
        const distance = Math.random() * 0.2 + 0.1;
        const angle = Math.random() * Math.PI * 2;
        const elevation = Math.random() * Math.PI - Math.PI / 2;

        secExp.position.set(
            Math.cos(angle) * Math.cos(elevation) * distance,
            Math.sin(elevation) * distance,
            Math.sin(angle) * Math.cos(elevation) * distance
        );

        secExp.userData = {
            isSecondaryExplosion: true,
            delay: Math.random() * 300 + 100, // Delay between 100-400ms
            duration: Math.random() * 400 + 200, // Duration between 200-600ms
            maxScale: Math.random() * 1.5 + 0.5,
            decay: 0.1
        };

        group.add(secExp);
    }

    // Debris particles - small fragments flying outward
    const debrisCount = 70; // Increased from 60
    for (let i = 0; i < debrisCount; i++) {
        // Create different types of debris
        let geometry;
        const debrisType = Math.floor(Math.random() * 5); // Added one more type

        switch (debrisType) {
            case 0: // Line (spark)
                geometry = new THREE.BufferGeometry();
                const length = Math.random() * 0.2 + 0.05;
                const dir = new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ).normalize();

                const positions = new Float32Array([
                    0, 0, 0,
                    dir.x * length, dir.y * length, dir.z * length
                ]);

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                break;
            case 1: // Small cube (fragment)
                geometry = new THREE.BoxGeometry(0.03, 0.03, 0.03);
                break;
            case 2: // Small sphere (molten fragment)
                geometry = new THREE.SphereGeometry(0.02, 4, 4);
                break;
            case 3: // Triangle (sharp fragment)
                geometry = new THREE.TetrahedronGeometry(0.03);
                break;
            default: // Cylinder (pipe fragment)
                geometry = new THREE.CylinderGeometry(0.01, 0.01, 0.05, 6);
        }

        // Determine color based on type and position
        let particleColor;
        if (debrisType === 0) { // Sparks are bright
            particleColor = i % 4 === 0
                ? new THREE.Color(0xffff80)
                : i % 4 === 1
                    ? new THREE.Color(0xffffff)
                    : i % 4 === 2
                        ? new THREE.Color(0xff8800)
                        : new THREE.Color(0xff4400);
        } else { // Other debris has more varied colors
            particleColor = i % 6 === 0
                ? color
                : i % 6 === 1
                    ? new THREE.Color(0xff3300)
                    : i % 6 === 2
                        ? new THREE.Color(0xff8800)
                        : i % 6 === 3
                            ? new THREE.Color(0xffcc00)
                            : i % 6 === 4
                                ? new THREE.Color(0x333333) // Charred debris
                                : new THREE.Color(color).lerp(new THREE.Color(0xff5500), 0.5);
        }

        const material = new THREE.MeshBasicMaterial({
            color: particleColor,
            transparent: true,
            opacity: 1
        });

        const debris = new THREE.Mesh(geometry, material);

        // Calculate velocity with more realistic physics
        // Particles closer to the center move faster
        const speed = Math.random() * 0.18 + 0.06;
        const angle = Math.random() * Math.PI * 2;
        const elevation = Math.random() * Math.PI - Math.PI / 2;

        const velocity = new THREE.Vector3(
            Math.cos(angle) * Math.cos(elevation) * speed,
            Math.sin(elevation) * speed,
            Math.sin(angle) * Math.cos(elevation) * speed
        );

        // Add some randomness to initial position for more natural look
        debris.position.set(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
        );

        // Add trail effect for some debris
        const hasTrail = debrisType === 0 && Math.random() < 0.6; // 60% of sparks have trails

        debris.userData = {
            isDebris: true,
            velocity: velocity,
            rotationSpeed: new THREE.Vector3(
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3
            ),
            gravity: new THREE.Vector3(0, -0.003, 0), // Add gravity effect
            drag: 0.98, // Air resistance
            decay: Math.random() * 0.01 + 0.005,
            hasTrail: hasTrail,
            trailInterval: Math.floor(Math.random() * 3) + 2, // How often to spawn trail particles
            trailCounter: 0,
            trailColor: particleColor
        };

        group.add(debris);
    }

    // Smoke particles - slower moving, expanding clouds
    const smokeCount = 20; // Increased from 15
    for (let i = 0; i < smokeCount; i++) {
        const smokeGeometry = new THREE.SphereGeometry(0.05 + Math.random() * 0.05, 8, 8);
        const smokeMaterial = new THREE.MeshBasicMaterial({
            color: i % 3 === 0 ? 0x222222 : i % 3 === 1 ? 0x444444 : 0x111111,
            transparent: true,
            opacity: 0.3 + Math.random() * 0.3
        });

        const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);

        // Random position slightly offset from center
        smoke.position.set(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
        );

        // Slower velocity for smoke
        const smokeSpeed = Math.random() * 0.03 + 0.01;
        const angle = Math.random() * Math.PI * 2;
        const elevation = Math.random() * Math.PI - Math.PI / 2;

        const velocity = new THREE.Vector3(
            Math.cos(angle) * Math.cos(elevation) * smokeSpeed,
            Math.sin(elevation) * smokeSpeed + 0.01, // Slight upward bias
            Math.sin(angle) * Math.cos(elevation) * smokeSpeed
        );

        smoke.userData = {
            isSmoke: true,
            velocity: velocity,
            expansionRate: 0.01 + Math.random() * 0.01,
            drag: 0.99,
            decay: 0.005 + Math.random() * 0.005,
            turbulence: new THREE.Vector3(
                (Math.random() - 0.5) * 0.001,
                (Math.random() - 0.5) * 0.001,
                (Math.random() - 0.5) * 0.001
            )
        };

        group.add(smoke);
    }

    // Position the explosion
    group.position.copy(position);

    // Set the group's userData for animation
    group.userData = {
        isExplosion: true,
        created: Date.now(),
        duration: 3000, // 3 seconds
        trailParticles: [] // Array to store trail particles
    };

    return group;
};

// Create a trail particle for debris
const createTrailParticle = (position: THREE.Vector3, color: THREE.Color | THREE.ColorRepresentation) => {
    const geometry = new THREE.SphereGeometry(0.01 + Math.random() * 0.01, 4, 4);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.6 + Math.random() * 0.3
    });

    const particle = new THREE.Mesh(geometry, material);
    particle.position.copy(position);

    particle.userData = {
        isTrail: true,
        created: Date.now(),
        duration: Math.random() * 300 + 200, // 200-500ms
        expansionRate: 0.01 + Math.random() * 0.01,
        decay: 0.05 + Math.random() * 0.05
    };

    return particle;
};

// Spaceship model using Three.js geometry
const createSpaceship = () => {
    // Create a group to hold all parts of the spaceship
    const ship = new THREE.Group();

    // Main body - elongated tetrahedron
    const bodyGeometry = new THREE.ConeGeometry(0.08, 0.3, 4);
    const bodyMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x00f0ff),
        wireframe: false
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI;
    ship.add(body);

    // Add invisible collision box for easier clicking
    const hitboxGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.5);
    const hitboxMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0, // Completely invisible
        depthWrite: false // Don't affect depth buffer
    });
    const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
    hitbox.userData = { isHitbox: true };
    ship.add(hitbox);

    // Wings
    const wingGeometry = new THREE.BoxGeometry(0.3, 0.01, 0.1);
    const wingMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff00ff),
        wireframe: true
    });
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.1, 0, 0);
    ship.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.1, 0, 0);
    ship.add(rightWing);

    // Engine glow
    const engineGlowGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const engineGlowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff00ff),
        transparent: true,
        opacity: 0.7
    });
    const engineGlow = new THREE.Mesh(engineGlowGeometry, engineGlowMaterial);
    engineGlow.position.set(0, 0.15, 0);
    ship.add(engineGlow);

    // Set ship type for raycasting identification
    ship.userData = {
        type: 'spaceship',
        color: new THREE.Color(0x00f0ff)
    };

    return ship;
};

// Cyberpunk drone model
const createDrone = () => {
    const drone = new THREE.Group();

    // Main body - sphere
    const bodyGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const bodyMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff00ff),
        wireframe: false
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    drone.add(body);

    // Add invisible collision box for easier clicking
    const hitboxGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const hitboxMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0, // Completely invisible
        depthWrite: false // Don't affect depth buffer
    });
    const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
    hitbox.userData = { isHitbox: true };
    drone.add(hitbox);

    // Rotors
    const rotorGeometry = new THREE.TorusGeometry(0.08, 0.01, 8, 8);
    const rotorMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x00f0ff),
        wireframe: true
    });

    for (let i = 0; i < 4; i++) {
        const rotor = new THREE.Mesh(rotorGeometry, rotorMaterial);
        const angle = (i / 4) * Math.PI * 2;
        rotor.position.set(Math.cos(angle) * 0.15, 0, Math.sin(angle) * 0.15);
        rotor.rotation.x = Math.PI / 2;
        drone.add(rotor);
    }

    // Set drone type for raycasting identification
    drone.userData = {
        type: 'drone',
        color: new THREE.Color(0xff00ff)
    };

    return drone;
};

// Cyberpunk bomb model
const createBomb = () => {
    const bomb = new THREE.Group();

    // Central bomb core
    const coreGeometry = new THREE.SphereGeometry(0.22, 12, 12);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff0000),
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    bomb.add(core);

    // Spikes
    const spikeGeometry = new THREE.ConeGeometry(0.06, 0.22, 4);
    const spikeMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
    for (let i = 0; i < 6; i++) {
        const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
        if (i === 0) spike.position.y = 0.25;
        if (i === 1) { spike.position.y = -0.25; spike.rotation.x = Math.PI; }
        if (i === 2) { spike.position.x = 0.25; spike.rotation.z = -Math.PI / 2; }
        if (i === 3) { spike.position.x = -0.25; spike.rotation.z = Math.PI / 2; }
        if (i === 4) { spike.position.z = 0.25; spike.rotation.x = Math.PI / 2; }
        if (i === 5) { spike.position.z = -0.25; spike.rotation.x = -Math.PI / 2; }
        bomb.add(spike);
    }

    // Outer wireframe
    const outerGeometry = new THREE.OctahedronGeometry(0.35);
    const outerMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff3300),
        wireframe: true
    });
    const outer = new THREE.Mesh(outerGeometry, outerMaterial);
    bomb.add(outer);

    // Hitbox
    const hitboxGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const hitboxMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0, // Completely invisible
        depthWrite: false // Don't affect depth buffer
    });
    const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
    hitbox.userData = { isHitbox: true };
    bomb.add(hitbox);

    bomb.userData = {
        type: 'bomb',
        color: new THREE.Color(0xff0000),
        coreRef: core
    };

    return bomb;
};

const roles = ['AI ENGINEER', 'AI RESEARCHER'];

const HeroSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const frameIdRef = useRef<number | null>(null);
    const shipsRef = useRef<THREE.Group[]>([]);
    const dronesRef = useRef<THREE.Group[]>([]);
    const bombsRef = useRef<THREE.Group[]>([]);
    const explosionsRef = useRef<THREE.Group[]>([]);
    const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
    const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
    const [isInitialized, setIsInitialized] = useState(false);

    // Game state variables
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

    useEffect(() => {
        gameStateRef.current = {
            gameActive,
            score,
            hearts,
            gameOver,
            highScore
        };
    }, [gameActive, score, hearts, gameOver, highScore]);

    useEffect(() => {
        const savedHighScore = localStorage.getItem('cyber_arcade_highscore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore, 10) || 0);
        }
    }, []);

    // Save high score and handle game over
    useEffect(() => {
        if (gameOver && score > highScore) {
            setHighScore(score);
            localStorage.setItem('cyber_arcade_highscore', score.toString());
        }
    }, [gameOver, score, highScore]);

    // Reset game function
    const resetGame = () => {
        setScore(0);
        setHearts(3);
        setGameOver(false);
        setGameActive(true);
    };

    // Quit game function
    const quitGame = () => {
        setScore(0);
        setHearts(3);
        setGameOver(false);
        setGameActive(false);
        // Remove all bombs from scene
        if (sceneRef.current) {
            bombsRef.current.forEach(bomb => {
                sceneRef.current!.remove(bomb);
            });
            bombsRef.current = [];
        }
    };

    // State for the typing effect
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typing effect logic
    useEffect(() => {
        const currentRole = roles[roleIndex];
        const typingSpeed = isDeleting ? 50 : 100; // Faster when deleting
        const pauseTime = 1500; // Time to pause at full text

        if (!isDeleting && displayedText === currentRole) {
            // Pause at full text
            const timeout = setTimeout(() => {
                setIsDeleting(true);
            }, pauseTime);
            return () => clearTimeout(timeout);
        } else if (isDeleting && displayedText === '') {
            // Move to next role
            setIsDeleting(false);
            setRoleIndex((roleIndex + 1) % roles.length);
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayedText(prev => {
                if (isDeleting) {
                    return prev.substring(0, prev.length - 1);
                } else {
                    return currentRole.substring(0, prev.length + 1);
                }
            });
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, roleIndex]);

    // Smooth scroll function that doesn't add hash to URL
    const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
        e.preventDefault();
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Get the target position, accounting for navbar height
            const navbarHeight = 80; // Adjust this value based on your navbar height
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            // Smooth scroll to the target position without changing URL
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        // Set up Three.js scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 3;
        cameraRef.current = camera;

        // Create renderer with proper context
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
        });
        rendererRef.current = renderer;

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500; // Reduced count for better performance

        const posArray = new Float32Array(particlesCount * 3);
        const colorsArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Position (spread out more evenly)
            posArray[i] = (Math.random() - 0.5) * 10;
            posArray[i + 1] = (Math.random() - 0.5) * 10;
            posArray[i + 2] = (Math.random() - 0.5) * 10;

            // Colors (cyan and magenta)
            if (Math.random() > 0.5) {
                colorsArray[i] = 0; // R
                colorsArray[i + 1] = 0.5 + Math.random() * 0.5; // G (0.5-1 for cyan)
                colorsArray[i + 2] = 0.5 + Math.random() * 0.5; // B (0.5-1 for cyan)
            } else {
                colorsArray[i] = 0.5 + Math.random() * 0.5; // R (0.5-1 for magenta)
                colorsArray[i + 1] = 0; // G
                colorsArray[i + 2] = 0.5 + Math.random() * 0.5; // B (0.5-1 for magenta)
            }
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Create spaceships
        const createRandomShips = () => {
            // Clear existing ships
            shipsRef.current.forEach(ship => {
                scene.remove(ship);
            });
            shipsRef.current = [];

            // Create new ships
            const shipCount = Math.floor(Math.random() * 3) + 2; // 2-4 ships

            for (let i = 0; i < shipCount; i++) {
                const ship = createSpaceship();

                // Random position off-screen
                const side = Math.random() > 0.5 ? 1 : -1;
                ship.position.x = side * (Math.random() * 2 + 5); // Start off-screen
                ship.position.y = (Math.random() - 0.5) * 3;
                ship.position.z = (Math.random() - 0.5) * 2;

                // Random rotation
                ship.rotation.z = Math.random() * Math.PI * 2;

                // Random scale
                const scale = Math.random() * 0.5 + 0.5;
                ship.scale.set(scale, scale, scale);

                // Random speed
                ship.userData = {
                    ...ship.userData,
                    speed: Math.random() * 0.03 + 0.01,
                    direction: -side, // Move in the opposite direction of starting position
                    rotationSpeed: (Math.random() - 0.5) * 0.01
                };

                scene.add(ship);
                shipsRef.current.push(ship);
            }
        };

        // Create drones
        const createRandomDrones = () => {
            // Clear existing drones
            dronesRef.current.forEach(drone => {
                scene.remove(drone);
            });
            dronesRef.current = [];

            // Create new drones
            const droneCount = Math.floor(Math.random() * 3) + 1; // 1-3 drones

            for (let i = 0; i < droneCount; i++) {
                const drone = createDrone();

                // Random position
                drone.position.x = (Math.random() - 0.5) * 8;
                drone.position.y = (Math.random() - 0.5) * 4;
                drone.position.z = (Math.random() - 0.5) * 2;

                // Random rotation
                drone.rotation.x = Math.random() * Math.PI * 2;
                drone.rotation.y = Math.random() * Math.PI * 2;
                drone.rotation.z = Math.random() * Math.PI * 2;

                // Random scale
                const scale = Math.random() * 0.3 + 0.2;
                drone.scale.set(scale, scale, scale);

                // Random movement pattern
                drone.userData = {
                    ...drone.userData,
                    orbitRadius: Math.random() * 0.5 + 0.2,
                    orbitSpeed: Math.random() * 0.01 + 0.005,
                    orbitAngle: Math.random() * Math.PI * 2,
                    basePosition: new THREE.Vector3(drone.position.x, drone.position.y, drone.position.z),
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    }
                };

                scene.add(drone);
                dronesRef.current.push(drone);
            }
        };

        // Create random bombs for game mode
        const createRandomBombs = () => {
            // Only spawn if in game mode
            if (!gameStateRef.current.gameActive || gameStateRef.current.gameOver) return;

            const maxBombs = 2;
            const currentBombs = bombsRef.current.length;
            const bombsToCreate = maxBombs - currentBombs;

            for (let i = 0; i < bombsToCreate; i++) {
                const bomb = createBomb();

                // Random position off-screen
                const side = Math.random() > 0.5 ? 1 : -1;
                bomb.position.x = side * (Math.random() * 2 + 5);
                bomb.position.y = (Math.random() - 0.5) * 3;
                bomb.position.z = (Math.random() - 0.5) * 2;

                // Random scale
                const scale = Math.random() * 0.4 + 0.4;
                bomb.scale.set(scale, scale, scale);

                // Movement data
                bomb.userData = {
                    ...bomb.userData,
                    speed: Math.random() * 0.02 + 0.015,
                    direction: -side,
                    baseY: bomb.position.y,
                    offset: Math.random() * Math.PI * 2,
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.03,
                        y: (Math.random() - 0.5) * 0.03,
                        z: (Math.random() - 0.5) * 0.03
                    }
                };

                scene.add(bomb);
                bombsRef.current.push(bomb);
            }
        };

        // Unified interaction handler for both mouse clicks and touch events
        const handleInteraction = (clientX: number, clientY: number) => {
            if (gameStateRef.current.gameOver) return;

            // Calculate mouse/touch position in normalized device coordinates (-1 to +1)
            const rect = canvasRef.current!.getBoundingClientRect();
            mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

            // Update the raycaster
            raycasterRef.current.setFromCamera(mouseRef.current, camera);

            // Objects to intersect
            const targetsToIntersect = [
                ...shipsRef.current.flatMap(ship => ship.children),
                ...dronesRef.current.flatMap(drone => drone.children),
                ...bombsRef.current.flatMap(bomb => bomb.children)
            ];

            const intersects = raycasterRef.current.intersectObjects(targetsToIntersect);

            if (intersects.length > 0) {
                const hitObject = intersects[0].object;
                const target = hitObject.parent;

                if (target && target.userData && target.userData.type) {
                    const type = target.userData.type;

                    if (type === 'spaceship' || type === 'drone') {
                        if (!gameStateRef.current.gameActive) {
                            setGameActive(true);
                            setScore(1);
                            setHearts(3);
                            setGameOver(false);
                        } else {
                            setScore(prev => prev + 1);
                        }

                        // Create explosion at position
                        const explosion = createExplosion(
                            target.position.clone(),
                            target.userData.color || new THREE.Color(0x00f0ff)
                        );
                        scene.add(explosion);
                        explosionsRef.current.push(explosion);

                        // Remove from scene and ref
                        scene.remove(target);
                        if (type === 'spaceship') {
                            shipsRef.current = shipsRef.current.filter(s => s !== target);
                        } else {
                            dronesRef.current = dronesRef.current.filter(d => d !== target);
                        }

                        // Haptic feedback
                        if (window.navigator && window.navigator.vibrate) {
                            window.navigator.vibrate(100);
                        }
                    } else if (type === 'bomb') {
                        if (gameStateRef.current.gameActive) {
                            // Create red explosion at position
                            const explosion = createExplosion(
                                target.position.clone(),
                                target.userData.color || new THREE.Color(0xff0000)
                            );
                            scene.add(explosion);
                            explosionsRef.current.push(explosion);

                            // Remove from scene and ref
                            scene.remove(target);
                            bombsRef.current = bombsRef.current.filter(b => b !== target);

                            // Deduct heart
                            setHearts(h => {
                                const nextHearts = Math.max(0, h - 1);
                                if (nextHearts === 0) {
                                    setGameOver(true);
                                }
                                return nextHearts;
                            });

                            // Haptic feedback
                            if (window.navigator && window.navigator.vibrate) {
                                window.navigator.vibrate(200);
                            }
                        }
                    }
                }
            }
        };

        // Handle click events for interactive explosions
        const handleClick = (event: MouseEvent) => {
            handleInteraction(event.clientX, event.clientY);
        };

        // Handle touch events for mobile
        const handleTouch = (event: TouchEvent) => {
            if (event.touches.length === 0 && event.changedTouches.length > 0) {
                const touch = event.changedTouches[0];
                handleInteraction(touch.clientX, touch.clientY);
            }
        };

        // Initial creation
        createRandomShips();
        createRandomDrones();

        // Periodically create new ships and drones
        const shipInterval = setInterval(() => {
            createRandomShips();
        }, 15000); // New ships every 15 seconds

        const droneInterval = setInterval(() => {
            createRandomDrones();
        }, 20000); // New drones every 20 seconds

        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        window.addEventListener('touchend', handleTouch); // For mobile

        // Handle window resize
        const handleResize = () => {
            if (!renderer || !camera) return;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
        let lastSpawnCheck = 0;
        const SPAWN_INTERVAL = 1000; // Only check spawning once per second

        const animate = () => {
            if (!renderer || !scene || !camera) return;

            frameIdRef.current = requestAnimationFrame(animate);
            const now = Date.now();

            particlesMesh.rotation.x += 0.0003;
            particlesMesh.rotation.y += 0.0003;

            // Subtle movement based on mouse position
            particlesMesh.rotation.x += mouseY * 0.0003;
            particlesMesh.rotation.y += mouseX * 0.0003;

            // Animate spaceships
            const isGameMode = gameStateRef.current.gameActive && !gameStateRef.current.gameOver;
            const speedMultiplier = isGameMode ? 1.5 : 1;

            for (let i = shipsRef.current.length - 1; i >= 0; i--) {
                const ship = shipsRef.current[i];
                ship.position.x += ship.userData.speed * ship.userData.direction * speedMultiplier;
                ship.rotation.z += ship.userData.rotationSpeed;

                if ((ship.userData.direction > 0 && ship.position.x > 5) ||
                    (ship.userData.direction < 0 && ship.position.x < -5)) {
                    scene.remove(ship);
                    shipsRef.current.splice(i, 1);
                }
            }

            // Animate drones
            for (let i = dronesRef.current.length - 1; i >= 0; i--) {
                const drone = dronesRef.current[i];
                drone.userData.orbitAngle += drone.userData.orbitSpeed * speedMultiplier;
                drone.position.x = drone.userData.basePosition.x +
                    Math.cos(drone.userData.orbitAngle) * drone.userData.orbitRadius;
                drone.position.y = drone.userData.basePosition.y +
                    Math.sin(drone.userData.orbitAngle) * drone.userData.orbitRadius;
                drone.rotation.x += drone.userData.rotationSpeed.x;
                drone.rotation.y += drone.userData.rotationSpeed.y;
                drone.rotation.z += drone.userData.rotationSpeed.z;
            }

            // Animate bombs (game mode only)
            const bombPulse = 0.6 + Math.sin(now * 0.008) * 0.4;
            for (let i = bombsRef.current.length - 1; i >= 0; i--) {
                const bomb = bombsRef.current[i];
                bomb.position.x += bomb.userData.speed * bomb.userData.direction;
                bomb.position.y = bomb.userData.baseY + Math.sin(now * 0.003 + bomb.userData.offset) * 0.4;

                if (bomb.userData.rotationSpeed) {
                    bomb.rotation.x += bomb.userData.rotationSpeed.x;
                    bomb.rotation.y += bomb.userData.rotationSpeed.y;
                    bomb.rotation.z += bomb.userData.rotationSpeed.z;
                }

                // Pulsate core using cached ref
                if (bomb.userData.coreRef) {
                    bomb.userData.coreRef.material.color.setRGB(bombPulse, 0, 0);
                }

                if ((bomb.userData.direction > 0 && bomb.position.x > 6) ||
                    (bomb.userData.direction < 0 && bomb.position.x < -6)) {
                    scene.remove(bomb);
                    bombsRef.current.splice(i, 1);
                }
            }

            // Game mode: throttled respawn (once per second, not every frame)
            if (isGameMode && now - lastSpawnCheck > SPAWN_INTERVAL) {
                lastSpawnCheck = now;

                if (shipsRef.current.length < 3) {
                    const ship = createSpaceship();
                    const side = Math.random() > 0.5 ? 1 : -1;
                    ship.position.x = side * (Math.random() * 2 + 5);
                    ship.position.y = (Math.random() - 0.5) * 3;
                    ship.position.z = (Math.random() - 0.5) * 2;
                    ship.rotation.z = Math.random() * Math.PI * 2;
                    const scale = Math.random() * 0.5 + 0.5;
                    ship.scale.set(scale, scale, scale);
                    ship.userData = {
                        ...ship.userData,
                        speed: Math.random() * 0.03 + 0.01,
                        direction: -side,
                        rotationSpeed: (Math.random() - 0.5) * 0.01
                    };
                    scene.add(ship);
                    shipsRef.current.push(ship);
                }

                if (dronesRef.current.length < 2) {
                    const drone = createDrone();
                    drone.position.x = (Math.random() - 0.5) * 8;
                    drone.position.y = (Math.random() - 0.5) * 4;
                    drone.position.z = (Math.random() - 0.5) * 2;
                    const scale = Math.random() * 0.3 + 0.2;
                    drone.scale.set(scale, scale, scale);
                    drone.userData = {
                        ...drone.userData,
                        orbitRadius: Math.random() * 0.5 + 0.2,
                        orbitSpeed: Math.random() * 0.01 + 0.005,
                        orbitAngle: Math.random() * Math.PI * 2,
                        basePosition: new THREE.Vector3(drone.position.x, drone.position.y, drone.position.z),
                        rotationSpeed: {
                            x: (Math.random() - 0.5) * 0.02,
                            y: (Math.random() - 0.5) * 0.02,
                            z: (Math.random() - 0.5) * 0.02
                        }
                    };
                    scene.add(drone);
                    dronesRef.current.push(drone);
                }

                createRandomBombs();
            }

            // Animate explosions
            explosionsRef.current.forEach(explosion => {
                const age = now - explosion.userData.created;
                const lifePercent = Math.min(age / explosion.userData.duration, 1);
                const easeOut = 1 - Math.pow(1 - lifePercent, 3); // Cubic ease out
                const easeIn = lifePercent * lifePercent; // Quadratic ease in

                // Animate each part of the explosion
                explosion.children.forEach(child => {
                    if (child.userData.isFlash) {
                        // Core flash expands quickly then fades
                        const flashPhase = Math.min(age / 300, 1); // First 300ms
                        const scale = child.userData.initialScale +
                            (child.userData.maxScale - child.userData.initialScale) * flashPhase;
                        child.scale.set(scale, scale, scale);

                        // Check if child is a Mesh before accessing material
                        if (child instanceof THREE.Mesh && child.material) {
                            child.material.opacity = Math.max(0, 1 - flashPhase * 2);
                        }
                    }
                    else if (child.userData.isEMP) {
                        // EMP wave expands very rapidly outward
                        const scale = child.userData.initialScale + easeOut * 25 * child.userData.expansionRate;
                        child.scale.set(scale, scale, scale);

                        // EMP wave fades quickly
                        // Check if child is a Mesh before accessing material
                        if (child instanceof THREE.Mesh && child.material) {
                            child.material.opacity = Math.max(0, 0.9 - easeOut * 1.5);

                            // Pulsating effect
                            if (age < 500) {
                                const pulse = Math.sin(age * 0.05) * 0.2 + 0.8;
                                child.material.opacity *= pulse;
                            }
                        }
                    }
                    else if (child.userData.isShockwave) {
                        // Shockwave expands rapidly outward
                        const scale = child.userData.initialScale + easeOut * 15 * child.userData.expansionRate;
                        child.scale.set(scale, scale, scale);

                        if (child instanceof THREE.Mesh && child.material) {
                            child.material.opacity = Math.max(0, 0.9 - easeOut * 1.2);
                        }
                    }
                    else if (child.userData.isFireball) {
                        // Fireball expands then contracts
                        let scale;
                        if (lifePercent < 0.3) {
                            scale = child.userData.initialScale +
                                (child.userData.maxScale - child.userData.initialScale) * (lifePercent / 0.3);
                        } else {
                            scale = child.userData.maxScale * (1 - ((lifePercent - 0.3) / 0.7));
                        }
                        child.scale.set(scale, scale, scale);

                        // Fade out
                        if (child instanceof THREE.Mesh && child.material) {
                            child.material.opacity = Math.max(0, 1 - easeIn * 1.2);

                            // Color transition from bright yellow to red to dark red
                            if (lifePercent < 0.2) {
                                child.material.color.setHex(0xffcc00);
                            } else if (lifePercent < 0.5) {
                                child.material.color.lerp(new THREE.Color(0xff3300), (lifePercent - 0.2) / 0.3);
                            } else {
                                child.material.color.lerp(new THREE.Color(0x661100), (lifePercent - 0.5) / 0.5);
                            }
                        }
                    }
                    else if (child.userData.isSecondaryExplosion) {
                        // Secondary explosions occur after a delay
                        const secAge = age - child.userData.delay;

                        if (secAge <= 0) {
                            // Not yet time for this secondary explosion
                            child.visible = false;
                        } else {
                            child.visible = true;
                            const secLifePercent = Math.min(secAge / child.userData.duration, 1);
                            const secEaseOut = 1 - Math.pow(1 - secLifePercent, 3);

                            // Expand quickly then fade
                            let scale;
                            if (secLifePercent < 0.5) {
                                scale = 1 + (child.userData.maxScale - 1) * (secLifePercent / 0.5);
                            } else {
                                scale = child.userData.maxScale * (1 - ((secLifePercent - 0.5) / 0.5) * 0.5);
                            }

                            child.scale.set(scale, scale, scale);

                            if (child instanceof THREE.Mesh && child.material) {
                                child.material.opacity = Math.max(0, 1 - secEaseOut * 1.2);

                                // Color transition
                                if (secLifePercent < 0.3) {
                                    child.material.color.setHex(0xffcc00);
                                } else if (secLifePercent < 0.6) {
                                    child.material.color.lerp(new THREE.Color(0xff3300), (secLifePercent - 0.3) / 0.3);
                                } else {
                                    child.material.color.lerp(new THREE.Color(0x661100), (secLifePercent - 0.6) / 0.4);
                                }
                            }
                        }
                    }
                    else if (child.userData.isDebris) {
                        // Debris physics - affected by gravity and drag
                        if (child.userData.velocity) {
                            // Apply gravity
                            child.userData.velocity.add(child.userData.gravity);

                            // Apply drag (air resistance)
                            child.userData.velocity.multiplyScalar(child.userData.drag);

                            // Update position
                            child.position.add(child.userData.velocity);

                            // Create trail particles for some debris
                            if (child.userData.hasTrail && lifePercent < 0.6) {
                                child.userData.trailCounter++;

                                if (child.userData.trailCounter >= child.userData.trailInterval) {
                                    child.userData.trailCounter = 0;

                                    // Create a trail particle at the current position
                                    const trail = createTrailParticle(
                                        child.position.clone(),
                                        child.userData.trailColor
                                    );

                                    scene.add(trail);
                                    explosion.userData.trailParticles.push(trail);
                                }
                            }
                        }

                        // Apply rotation
                        if (child.userData.rotationSpeed) {
                            child.rotation.x += child.userData.rotationSpeed.x;
                            child.rotation.y += child.userData.rotationSpeed.y;
                            child.rotation.z += child.userData.rotationSpeed.z;
                        }

                        // Fade out gradually
                        if (child instanceof THREE.Mesh && child.material) {
                            child.material.opacity = Math.max(0, 1 - easeIn * 1.2);
                        }
                    }
                    else if (child.userData.isSmoke) {
                        // Smoke expands and rises
                        if (child.userData.velocity) {
                            // Apply drag (air resistance)
                            child.userData.velocity.multiplyScalar(child.userData.drag);

                            // Apply velocity
                            child.position.add(child.userData.velocity);

                            // Apply gravity (reduced for smoke)
                            child.userData.velocity.y += child.userData.gravity;
                        }

                        // Expand smoke
                        const scale = 1 + easeOut * 5 * child.userData.expansionRate;
                        child.scale.set(scale, scale, scale);

                        // Fade out gradually, but stay visible longer than debris
                        if (child instanceof THREE.Mesh && child.material) {
                            child.material.opacity = Math.max(0, child.userData.opacity * (1 - easeIn));
                        }
                    }
                    else if (!child.userData.isHitbox) {
                        // Handle any other particles
                        if (child.userData.velocity) {
                            // Apply velocity
                            child.position.add(child.userData.velocity);

                            // Apply gravity
                            child.userData.velocity.y += child.userData.gravity;
                        }

                        // Fade out
                        if (child instanceof THREE.Mesh && child.material) {
                            child.material.opacity = Math.max(0, 1 - easeOut);
                        }
                    }
                });

                // Animate trail particles
                explosion.userData.trailParticles = explosion.userData.trailParticles.filter((trail: THREE.Object3D) => {
                    const trailAge = now - trail.userData.created;
                    const trailLifePercent = Math.min(trailAge / trail.userData.duration, 1);

                    // Expand slightly
                    const scale = 1 + trailLifePercent * trail.userData.expansionRate;
                    trail.scale.set(scale, scale, scale);

                    // Fade out
                    if (trail instanceof THREE.Mesh && trail.material) {
                        // Check if it's a single material with opacity property
                        const material = Array.isArray(trail.material) ? trail.material[0] : trail.material;
                        if (material && 'opacity' in material) {
                            material.opacity = Math.max(0, 1 - trailLifePercent);
                        }
                    }

                    // Remove if complete
                    if (trailLifePercent >= 1) {
                        scene.remove(trail);
                        if (trail instanceof THREE.Mesh) {
                            if (trail.geometry) {
                                trail.geometry.dispose();
                            }
                            if (trail.material) {
                                if (Array.isArray(trail.material)) {
                                    trail.material.forEach(mat => mat.dispose());
                                } else {
                                    trail.material.dispose();
                                }
                            }
                        }
                        return false;
                    }

                    return true;
                });

                // Remove explosion if it's done
                if (lifePercent >= 1) {
                    scene.remove(explosion);

                    // Dispose of all geometries and materials
                    explosion.children.forEach(child => {
                        if (child instanceof THREE.Mesh) {
                            if (child.geometry) {
                                child.geometry.dispose();
                            }
                            if (child.material) {
                                if (Array.isArray(child.material)) {
                                    child.material.forEach(mat => mat.dispose());
                                } else {
                                    child.material.dispose();
                                }
                            }
                        }
                    });

                    // Clean up any remaining trail particles
                    explosion.userData.trailParticles.forEach((trail: THREE.Object3D) => {
                        scene.remove(trail);
                        if (trail instanceof THREE.Mesh) {
                            if (trail.geometry) {
                                trail.geometry.dispose();
                            }
                            if (trail.material) {
                                if (Array.isArray(trail.material)) {
                                    trail.material.forEach(mat => mat.dispose());
                                } else {
                                    trail.material.dispose();
                                }
                            }
                        }
                    });
                }
            });

            // Filter out completed explosions
            explosionsRef.current = explosionsRef.current.filter(exp => {
                const age = now - exp.userData.created;
                return age < exp.userData.duration;
            });

            renderer.render(scene, camera);
        };

        animate();
        setIsInitialized(true);

        // Cleanup
        return () => {
            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }

            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('touchend', handleTouch);
            window.removeEventListener('resize', handleResize);

            clearInterval(shipInterval);
            clearInterval(droneInterval);

            // Dispose resources
            particlesGeometry.dispose();
            particlesMaterial.dispose();

            // Dispose all bombs
            bombsRef.current.forEach(bomb => {
                bomb.children.forEach(child => {
                    if (child instanceof THREE.Mesh) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(mat => mat.dispose());
                            } else {
                                child.material.dispose();
                            }
                        }
                    }
                });
            });

            // Dispose all ships
            shipsRef.current.forEach(ship => {
                ship.children.forEach(child => {
                    if (child instanceof THREE.Mesh) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(mat => mat.dispose());
                            } else {
                                child.material.dispose();
                            }
                        }
                    }
                });
            });

            // Dispose all drones
            dronesRef.current.forEach(drone => {
                drone.children.forEach(child => {
                    if (child instanceof THREE.Mesh) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(mat => mat.dispose());
                            } else {
                                child.material.dispose();
                            }
                        }
                    }
                });
            });

            // Dispose all explosions
            explosionsRef.current.forEach(explosion => {
                explosion.children.forEach(child => {
                    if (child instanceof THREE.Mesh) {
                        if (child.geometry) {
                            child.geometry.dispose();
                        }
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(mat => mat.dispose());
                            } else {
                                child.material.dispose();
                            }
                        }
                    }
                });
            });

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }

            sceneRef.current = null;
            rendererRef.current = null;
            cameraRef.current = null;
        };
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
            {/* Three.js canvas background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 -z-10 cursor-crosshair"
                title="Click on spaceships or drones to destroy them!"
            />

            {/* ===== GAME HUD (visible during active gameplay) ===== */}
            {gameActive && !gameOver && (
                <motion.div
                    className="absolute top-20 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 py-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Score */}
                    <div className="bg-black/60 backdrop-blur-md border border-neon-blue/50 rounded-lg px-4 py-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                        <span className="font-cyber text-xs text-neon-blue/70 tracking-widest">SCORE</span>
                        <div className="font-cyber text-2xl sm:text-3xl text-neon-blue tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                            {String(score).padStart(3, '0')}
                        </div>
                    </div>

                    {/* Quit Button */}
                    <motion.button
                        onClick={quitGame}
                        className="bg-black/60 backdrop-blur-md border border-gray-500/50 rounded-lg px-4 py-2 font-cyber text-xs sm:text-sm text-gray-400 tracking-widest hover:text-white hover:border-neon-pink/50 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        [ QUIT ]
                    </motion.button>

                    {/* Hearts */}
                    <div className="bg-black/60 backdrop-blur-md border border-neon-pink/50 rounded-lg px-4 py-2 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                        <span className="font-cyber text-xs text-neon-pink/70 tracking-widest">HEALTH</span>
                        <div className="flex gap-2 mt-1">
                            {[0, 1, 2].map(i => (
                                <motion.span
                                    key={i}
                                    className={`text-xl sm:text-2xl transition-all duration-300 ${i < hearts ? '' : 'grayscale opacity-30'}`}
                                    animate={i < hearts ? { scale: [1, 1.2, 1] } : { scale: 0.8 }}
                                    transition={i < hearts ? { duration: 0.8, repeat: Infinity, repeatDelay: 1 } : { duration: 0.3 }}
                                >
                                    ❤️
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ===== GAME OVER OVERLAY ===== */}
            {gameOver && (
                <motion.div
                    className="absolute inset-0 z-40 flex items-center justify-center bg-black/75 backdrop-blur-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="text-center p-8 sm:p-12 rounded-2xl border border-red-500/30 bg-black/60 backdrop-blur-xl shadow-[0_0_60px_rgba(255,0,0,0.15)] max-w-md w-full mx-4"
                        initial={{ scale: 0.8, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Game Over Title */}
                        <motion.div
                            className="mb-6"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <div className="font-cyber text-sm sm:text-base tracking-[0.3em] text-red-400/80 mb-1">
                                SYSTEM CRITICAL
                            </div>
                            <h2 className="font-cyber text-3xl sm:text-4xl md:text-5xl font-bold text-red-500" style={{ textShadow: '0 0 20px rgba(255, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3)' }}>
                                GAME OVER
                            </h2>
                        </motion.div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mb-6" />

                        {/* Score Display */}
                        <div className="mb-4">
                            <div className="font-cyber text-xs tracking-widest text-neon-blue/70 mb-1">FINAL SCORE</div>
                            <div className="font-cyber text-4xl sm:text-5xl text-neon-blue" style={{ textShadow: '0 0 15px rgba(0, 240, 255, 0.5)' }}>
                                {String(score).padStart(3, '0')}
                            </div>
                        </div>

                        {/* High Score */}
                        <div className="mb-6">
                            <div className="font-cyber text-xs tracking-widest text-neon-pink/70 mb-1">HIGH SCORE</div>
                            <div className="font-cyber text-2xl sm:text-3xl text-neon-pink" style={{ textShadow: '0 0 15px rgba(255, 0, 255, 0.5)' }}>
                                {String(highScore).padStart(3, '0')}
                            </div>
                            {score >= highScore && score > 0 && (
                                <motion.div
                                    className="mt-2 inline-block bg-neon-pink/20 border border-neon-pink/50 rounded-full px-4 py-1"
                                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                >
                                    <span className="font-cyber text-xs tracking-widest text-neon-pink">
                                        ★ NEW RECORD ★
                                    </span>
                                </motion.div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent mb-6" />

                        {/* Replay Button */}
                        <motion.button
                            onClick={resetGame}
                            className="font-cyber text-sm sm:text-base tracking-[0.2em] px-8 py-3 bg-transparent border-2 border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            [ REDEPLOY ]
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}

            {/* ===== HERO CONTENT (hidden during game) ===== */}
            {!gameActive && (
                <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex items-center justify-center min-h-[80vh]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-cyber font-bold mb-4 md:mb-6">
                            <span className="block mb-2">LE VO QUYET THANG</span>
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-neon-blue">🧠</span>
                                <span className="text-gradient h-[1.5em] inline-flex items-center">
                                    {displayedText}
                                    <span className="ml-1 h-[1.2em] w-[2px] bg-neon-pink animate-blink"></span>
                                </span>
                                <span className="text-neon-pink">⚡</span>
                            </div>
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-300 max-w-3xl mx-auto px-2">
                            Welcome to my portfolio! I'm Le Vo Quyet Thang, an AI Engineer and Researcher with expertise in NLP.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                            <motion.button
                                onClick={(e) => scrollToSection(e as any, 'projects')}
                                className="px-6 sm:px-8 py-3 bg-transparent border-2 border-neon-blue text-neon-blue font-cyber rounded-md hover:bg-neon-blue/20 transition-colors duration-300 text-sm sm:text-base"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                EXPLORE PROJECTS
                            </motion.button>

                            <motion.button
                                onClick={(e) => scrollToSection(e as any, 'contact')}
                                className="px-6 sm:px-8 py-3 bg-neon-pink text-black font-cyber rounded-md hover:bg-neon-pink/90 transition-colors duration-300 text-sm sm:text-base"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                CONNECT
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Interactive hint that appears and then disappears */}
                    <motion.div
                        className="absolute top-[calc(50%-200px)] left-1/2 transform -translate-x-1/2 text-sm md:text-base text-center z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{
                            times: [0, 0.1, 0.8, 1],
                            duration: 5,
                            delay: 2,
                            ease: "easeInOut"
                        }}
                    >
                        <motion.div
                            className="inline-block bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md border border-neon-blue/50"
                            animate={{
                                boxShadow: ['0 0 0px rgba(0, 240, 255, 0.3)', '0 0 10px rgba(0, 240, 255, 0.7)', '0 0 0px rgba(0, 240, 255, 0.3)'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: 3,
                                repeatType: "reverse"
                            }}
                        >
                            <span className="hidden sm:inline text-neon-blue font-cyber tracking-wider">
                                <span className="text-white opacity-80">[ </span>
                                Click on ships and drones to destroy them!
                                <span className="text-white opacity-80"> ]</span>
                            </span>
                            <span className="sm:hidden text-neon-blue font-cyber tracking-wider">
                                <span className="text-white opacity-80">[ </span>
                                Tap ships and drones!
                                <span className="text-white opacity-80"> ]</span>
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            )}

            {/* Scroll down arrow with fixed positioning (hidden during game) */}
            {!gameActive && (
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                >
                    <button
                        onClick={(e) => scrollToSection(e as any, 'about')}
                        className="flex items-center justify-center p-2 rounded-full bg-cyber-black/50 backdrop-blur-sm border border-neon-blue/30 hover:bg-cyber-gray/50 transition-colors duration-300 cursor-pointer"
                        aria-label="Scroll to About section"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-neon-blue"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </section>
    );
};

export default HeroSection; 