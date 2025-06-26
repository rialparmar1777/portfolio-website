import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

interface ParticleFieldProps {
  speed?: number;
}

function ParticleField({ speed = 1 }: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null!);
  
  useFrame((state) => {
    points.current.rotation.x = state.clock.getElapsedTime() * 0.1 * speed;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.15 * speed;
  });

  const particleCount = 5000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation={true}
        color="#ffffff"
        opacity={0.6}
      />
    </Points>
  );
}

interface AnimatedBackgroundProps {
  speed?: number;
}

const AnimatedBackground = ({ speed = 1 }: AnimatedBackgroundProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField speed={speed} />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground; 