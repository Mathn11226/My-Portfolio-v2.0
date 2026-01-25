// @ts-nocheck
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, ContactShadows, RoundedBox, Sphere, Cylinder, useCursor } from '@react-three/drei';
import * as THREE from 'three';



const Robot = (props: any) => {
    const headRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (headRef.current) {
            // Dynamic idle animation: Head actively scans surroundings
            // Increased speed (t * 1.5) and range (0.35) for Y rotation (left/right)
            headRef.current.rotation.y = Math.sin(t * 1.5) * 0.35;
            // Added slight X rotation for nodding effect
            headRef.current.rotation.x = Math.sin(t * 2) * 0.05;
            // Vertical bobbing
            headRef.current.position.y = 1.6 + Math.sin(t * 2) * 0.05;
        }
    });

    return (
        <group {...props} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
            <Float speed={4} rotationIntensity={0.2} floatIntensity={0.5}>

                {/* Body */}
                <RoundedBox args={[1, 1.2, 0.7]} radius={0.3} position={[0, 0.2, 0]}>
                    <meshStandardMaterial color="#86198f" roughness={0.4} metalness={0.6} />
                </RoundedBox>

                {/* Glowing Core */}
                <Sphere args={[0.25]} position={[0, 0.2, 0.36]}>
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} toneMapped={false} />
                </Sphere>

                {/* Head */}
                <group ref={headRef}>
                    <RoundedBox args={[0.85, 0.85, 0.85]} radius={0.25}>
                        <meshStandardMaterial color="#d946ef" roughness={0.2} metalness={0.5} />
                    </RoundedBox>

                    {/* Face Screen */}
                    <RoundedBox args={[0.65, 0.5, 0.1]} radius={0.05} position={[0, 0, 0.4]}>
                        <meshStandardMaterial color="#1a103c" roughness={0.2} metalness={0.8} />
                    </RoundedBox>

                    {/* Eyes */}
                    <Sphere args={[0.12, 32, 32]} position={[-0.2, 0.05, 0.46]} scale={[1, hovered ? 0.2 : 1, 1]}> {/* Blink on hover */}
                        <meshStandardMaterial color="#FACC15" emissive="#FACC15" emissiveIntensity={3} toneMapped={false} />
                    </Sphere>
                    <Sphere args={[0.12, 32, 32]} position={[0.2, 0.05, 0.46]} scale={[1, hovered ? 0.2 : 1, 1]}>
                        <meshStandardMaterial color="#FACC15" emissive="#FACC15" emissiveIntensity={3} toneMapped={false} />
                    </Sphere>

                    {/* Antenna */}
                    <Cylinder args={[0.02, 0.02, 0.4]} position={[0, 0.5, 0]}>
                        <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0} />
                    </Cylinder>
                    <Sphere args={[0.08]} position={[0, 0.75, 0]}>
                        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
                    </Sphere>
                </group>

                {/* Arms - detached floating */}
                <group position={[-0.8, 0.2, 0]}>
                    <RoundedBox args={[0.25, 0.7, 0.25]} radius={0.1}>
                        <meshStandardMaterial color="#a21caf" />
                    </RoundedBox>
                </group>
                <group position={[0.8, 0.2, 0]}>
                    <RoundedBox args={[0.25, 0.7, 0.25]} radius={0.1}>
                        <meshStandardMaterial color="#a21caf" />
                    </RoundedBox>
                </group>
            </Float>
            <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={5} blur={2.5} />
        </group>
    );
};

const AvatarCanvas = () => {
    return (
        <div className="h-[400px] w-full" style={{ touchAction: 'none' }}> {/* Prevent scroll on mobile drag */}
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} color="#d946ef" />
                <pointLight position={[-10, -5, -5]} intensity={0.5} color="#3b82f6" />
                <PresentationControls
                    global={false}
                    cursor={true}
                    snap={true}
                    speed={1.5}
                    zoom={1}
                    rotation={[0, -0.3, 0]} // Initial slight angle
                    polar={[-Math.PI / 6, Math.PI / 6]}
                    azimuth={[-Math.PI / 2, Math.PI / 2]}
                >
                    <Robot scale={1.2} position={[0, -0.5, 0]} />
                </PresentationControls>
            </Canvas>
        </div>
    )
}

export default AvatarCanvas;