import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Instance, Instances, Cloud, Text, Trail } from '@react-three/drei';
import * as THREE from 'three';

// --- CONFIGURATION ---

const SEASON_CONFIG = [
    {
        name: "Spring",
        bg: "#022c22", // Deep Jungle Green
        fog: "#115e59", // Teal 800
        light: "#5eead4", // Teal 300
        ground: "#134e4a", // Teal 900
        particle: "#2dd4bf" // Teal 400
    },
    {
        name: "Summer",
        bg: "#1e1b4b", // Deep Indigo
        fog: "#312e81", // Indigo 900
        light: "#818cf8", // Indigo 400
        ground: "#3730a3", // Indigo 800
        particle: "#c084fc" // Purple 400
    },
    {
        name: "Autumn",
        bg: "#451a03", // Amber 950
        fog: "#78350f", // Amber 900
        light: "#fbbf24", // Amber 400
        ground: "#92400e", // Amber 800
        particle: "#fcd34d" // Amber 300
    },
    {
        name: "Winter",
        bg: "#020617", // Slate 950
        fog: "#0f172a", // Slate 900
        light: "#38bdf8", // Sky 400
        ground: "#1e293b", // Slate 800
        particle: "#e0f2fe" // Sky 100
    }
];

// Define a winding 3D path for the journey
const CURVE_POINTS = [
    new THREE.Vector3(0, -2, 10),     // Hero
    new THREE.Vector3(0, -5, -20),    // About (Descent)
    new THREE.Vector3(15, 5, -50),    // Experience (Climb Right)
    new THREE.Vector3(-10, 0, -80),   // Projects (Curve Left)
    new THREE.Vector3(0, 8, -110)     // Contact (Ascent)
];

const IslandGeometry = new THREE.CylinderGeometry(5, 2, 6, 6);
const TechGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

// --- COMPONENTS ---

const ExplorerAvatar = ({ scrollProgress, curve }: { scrollProgress: number, curve: THREE.CatmullRomCurve3 }) => {
    const group = useRef<THREE.Group>(null);
    const bodyMesh = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;

        // 1. Calculate Position on Curve
        const t = scrollProgress;
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();

        // 2. Update Position
        group.current.position.copy(point);
        // Lift slightly above the path
        group.current.position.y += 1;

        // 3. Orientation - Look ahead
        const lookAtPoint = curve.getPointAt(Math.min(t + 0.01, 1));
        group.current.lookAt(lookAtPoint);

        // 4. Walking Animation (Bobbing + Tilt)
        const walkSpeed = state.clock.elapsedTime * 12;
        if (bodyMesh.current) {
            bodyMesh.current.position.y = 0.7 + Math.sin(walkSpeed) * 0.1;
            bodyMesh.current.rotation.z = Math.sin(walkSpeed) * 0.05; // Swagger
        }
    });

    return (
        <group ref={group}>
            <Float speed={5} rotationIntensity={0.2} floatIntensity={0}>
                <group ref={bodyMesh}>
                    {/* Trail Effect */}
                    <Trail width={1} length={4} color="#2dd4bf" attenuation={(t) => t * t}>
                        {/* Body */}
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[0.6, 0.8, 0.4]} />
                            <meshStandardMaterial color="#0f766e" emissive="#115e59" roughness={0.2} />
                        </mesh>
                    </Trail>

                    {/* Glowing Head */}
                    <mesh position={[0, 0.6, 0]}>
                        <sphereGeometry args={[0.35]} />
                        <meshStandardMaterial color="#fcd34d" emissive="#f59e0b" emissiveIntensity={2} toneMapped={false} />
                    </mesh>

                    {/* Backpack/Jetpack */}
                    <mesh position={[0, 0.2, -0.35]}>
                        <boxGeometry args={[0.5, 0.6, 0.2]} />
                        <meshStandardMaterial color="#3b82f6" emissive="#1e40af" />
                    </mesh>
                </group>
            </Float>
            {/* Dynamic Light from Avatar */}
            <pointLight position={[0, 2, 0]} distance={10} intensity={2} color="#2dd4bf" />
        </group>
    );
};

const GlowingPath = ({ curve }: { curve: THREE.CatmullRomCurve3 }) => {
    // Create a tube geometry along the path
    const geometry = useMemo(() => new THREE.TubeGeometry(curve, 100, 1.5, 8, false), [curve]);

    return (
        <mesh geometry={geometry} position={[0, -0.2, 0]}>
            <meshPhysicalMaterial
                color="#5eead4"
                emissive="#2dd4bf"
                emissiveIntensity={0.5}
                transparent
                opacity={0.15}
                roughness={0.2}
                metalness={0.9}
                wireframe={true}
            />
        </mesh>
    );
};

const FloatingIslands = ({ count = 30 }: { count?: number }) => {
    // Generate islands randomly but clustered near the path points
    const islands = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            // Pick a random point along the journey to be the "anchor"
            const progress = Math.random();
            // We use the curve logic conceptually (approximated here for static generation)
            // Instead, let's scatter them in the bounding box of the journey
            const x = (Math.random() - 0.5) * 60;
            const y = (Math.random() - 0.5) * 40;
            const z = -Math.random() * 120 + 20;

            const scale = 0.5 + Math.random() * 1.5;
            temp.push({ position: [x, y, z], scale: [scale, scale * (0.5 + Math.random()), scale] });
        }
        return temp;
    }, [count]);

    return (
        <Instances range={count} geometry={IslandGeometry}>
            <meshStandardMaterial color="#020617" roughness={0.3} metalness={0.8} />
            {islands.map((data, i) => (
                <Instance
                    key={i}
                    position={data.position as [number, number, number]}
                    scale={data.scale as [number, number, number]}
                    rotation={[0, Math.random() * Math.PI, 0]}
                />
            ))}
        </Instances>
    );
};

const SkillTotems = () => {
    return (
        <group position={[0, -5, -20]}> {/* Position near 'About' section */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <group position={[-6, 2, 0]}>
                    <Text
                        color="#2dd4bf" // Teal
                        fontSize={1.5}
                        maxWidth={20}
                        lineHeight={1}
                        letterSpacing={0.02}
                        textAlign="center"
                        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        ANALYSIS
                    </Text>
                    <mesh position={[0, -1.5, 0]}>
                        <octahedronGeometry args={[0.8]} />
                        <meshStandardMaterial color="#2dd4bf" wireframe />
                    </mesh>
                </group>

                <group position={[0, 4, -5]}>
                    <Text
                        color="#818cf8" // Indigo
                        fontSize={1.5}
                        anchorX="center"
                        anchorY="middle"
                        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    >
                        QUALITY
                    </Text>
                    <mesh position={[0, -1.5, 0]}>
                        <icosahedronGeometry args={[0.8]} />
                        <meshStandardMaterial color="#818cf8" wireframe />
                    </mesh>
                </group>

                <group position={[6, 2, 0]}>
                    <Text
                        color="#f472b6" // Pink
                        fontSize={1.5}
                        anchorX="center"
                        anchorY="middle"
                        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    >
                        DESIGN
                    </Text>
                    <mesh position={[0, -1.5, 0]}>
                        <torusKnotGeometry args={[0.5, 0.2, 64, 8]} />
                        <meshStandardMaterial color="#f472b6" wireframe />
                    </mesh>
                </group>
            </Float>
        </group>
    )
}

const TechParticles = ({ colorRef }: { colorRef: React.MutableRefObject<THREE.Color> }) => {
    const count = 200;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = -Math.random() * 120 + 20;
            temp.push({ pos: [x, y, z], speed: Math.random() * 0.5, offset: Math.random() * 100 });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;
        particles.forEach((p, i) => {
            const t = state.clock.elapsedTime;
            dummy.position.set(
                p.pos[0],
                p.pos[1] + Math.sin(t * p.speed + p.offset) * 2,
                p.pos[2]
            );
            dummy.rotation.x += 0.01;
            dummy.rotation.y += 0.01;
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        // Tint particles based on season
        if (mesh.current.material instanceof THREE.MeshStandardMaterial) {
            mesh.current.material.color.lerp(colorRef.current, 0.05);
            mesh.current.material.emissive.lerp(colorRef.current, 0.05);
        }
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} geometry={TechGeometry}>
            <meshStandardMaterial emissiveIntensity={1} toneMapped={false} />
        </instancedMesh>
    );
};

export const MountainScene: React.FC = () => {
    const bgRef = useRef<THREE.Color>(new THREE.Color(SEASON_CONFIG[0].bg));
    const fogRef = useRef<THREE.Fog>(null);
    const lightRef = useRef<THREE.DirectionalLight>(null);
    const particleColorRef = useRef<THREE.Color>(new THREE.Color(SEASON_CONFIG[0].particle));

    // Curve setup
    const curve = useMemo(() => new THREE.CatmullRomCurve3(CURVE_POINTS), []);

    // Scroll & Animation State

    useFrame((state) => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const rawProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

        // --- Camera Follow Logic ---
        // Avatar is at 'rawProgress'. Camera trails behind.
        const camProgress = Math.max(0, rawProgress - 0.05); // Camera lags slightly (behind avatar)
        const camLookAtProgress = Math.min(1, rawProgress + 0.05); // Look slightly ahead of avatar

        const camPos = curve.getPointAt(camProgress);
        const lookAtPos = curve.getPointAt(camLookAtProgress);

        // Offset camera visually to be "Third Person"
        // We lift it up (y+5) and maybe move it sideways slightly depending on curve?
        // Simple offset: just use the curve position but higher.
        camPos.y += 4;
        camPos.x += 2; // Slight angle

        // Smooth camera lerp
        state.camera.position.lerp(camPos, 0.08);
        state.camera.lookAt(lookAtPos);

        // --- Season Logic (Same as before but refined colors) ---
        const floatIndex = rawProgress * (SEASON_CONFIG.length - 1);
        const index = Math.floor(floatIndex);
        const nextIndex = Math.min(index + 1, SEASON_CONFIG.length - 1);
        const mixFactor = floatIndex - index;

        const currentSeason = SEASON_CONFIG[index];
        const nextSeason = SEASON_CONFIG[nextIndex];

        const targetBg = new THREE.Color(currentSeason.bg).lerp(new THREE.Color(nextSeason.bg), mixFactor);
        state.scene.background = targetBg;

        if (fogRef.current) {
            const targetFog = new THREE.Color(currentSeason.fog).lerp(new THREE.Color(nextSeason.fog), mixFactor);
            fogRef.current.color.lerp(targetFog, 0.05);
        }

        if (lightRef.current) {
            const targetLight = new THREE.Color(currentSeason.light).lerp(new THREE.Color(nextSeason.light), mixFactor);
            lightRef.current.color.lerp(targetLight, 0.05);
        }

        const targetParticle = new THREE.Color(currentSeason.particle).lerp(new THREE.Color(nextSeason.particle), mixFactor);
        particleColorRef.current.copy(targetParticle);
    });

    return (
        <>
            <fog ref={fogRef} attach="fog" args={['#022c22', 5, 40]} />

            <ambientLight intensity={0.5} />
            <directionalLight ref={lightRef} position={[10, 20, 10]} intensity={1.5} />

            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            {/* The Journey Path */}
            <GlowingPath curve={curve} />

            {/* The Traveler */}
            {/* Pass a smoothed progress if possible, but raw works for now */}
            <ExplorerAvatar scrollProgress={Math.min(Math.max(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 0), 1)} curve={curve} />

            {/* Environment */}
            <FloatingIslands count={40} />
            <TechParticles colorRef={particleColorRef} />
            <SkillTotems />

            {/* Clouds for atmosphere */}
            <Cloud opacity={0.2} speed={0.1} bounds={[30, 5, 10]} segments={10} position={[0, -5, -10]} color="#14b8a6" />
            <Cloud opacity={0.2} speed={0.1} bounds={[40, 5, 10]} segments={10} position={[0, 10, -60]} color="#8b5cf6" />
        </>
    );
};