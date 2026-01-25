import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, TorusKnot, Icosahedron, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, speed, type }: { position: [number, number, number], color: string, speed: number, type: 'torus' | 'ico' | 'sphere' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * (speed * 0.5);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {type === 'torus' && <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />}
        {type === 'ico' && <icosahedronGeometry args={[0.8, 0]} />}
        {type === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
        <MeshDistortMaterial 
          color={color} 
          speed={2} 
          distort={0.4} 
          radius={1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

export const MagicalScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#d946ef" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FACC15" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <group>
         {/* Abstract representation of "Building Blocks" of analysis */}
        <FloatingShape position={[-3, 2, -5]} color="#d946ef" speed={0.5} type="torus" />
        <FloatingShape position={[4, -2, -6]} color="#FACC15" speed={0.3} type="ico" />
        <FloatingShape position={[-4, -3, -8]} color="#3b82f6" speed={0.4} type="sphere" />
        <FloatingShape position={[5, 3, -10]} color="#a855f7" speed={0.2} type="torus" />
      </group>
    </>
  );
};
