import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Line } from "@react-three/drei";
import type { Mesh, Group } from "three";
import * as THREE from "three";

function TechKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
      meshRef.current.rotation.y += 0.004;
      meshRef.current.rotation.z = Math.cos(clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={1.3}>
        <torusKnotGeometry args={[0.8, 0.3, 128, 16]} />
        <MeshDistortMaterial
          color="#d4a853"
          emissive="#d4a853"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.5}
          wireframe={false}
          speed={2}
          distort={0.15}
        />
      </mesh>
    </Float>
  );
}

function OrbitingShape({ radius, speed, color, geometry, offset = 0 }: { radius: number; speed: number; color: string; geometry: "icosahedron" | "octahedron" | "tetrahedron"; offset?: number }) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * speed + offset;
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.5;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
    }
  });

  const geo = geometry === "icosahedron" ? [0.25, 0] : geometry === "octahedron" ? [0.22, 0] : [0.2, 0];

  return (
    <group ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef}>
          {geometry === "icosahedron" && <icosahedronGeometry args={geo as [number, number]} />}
          {geometry === "octahedron" && <octahedronGeometry args={geo as [number, number]} />}
          {geometry === "tetrahedron" && <tetrahedronGeometry args={geo as [number, number]} />}
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={0.5}
            speed={1.5}
            distort={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

function OrbitRing({ radius, color }: { radius: number; color: string }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.15}
    />
  );
}

function TechParticles() {
  const [positions, colors, sizes] = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const palette = [
      new THREE.Color("#d4a853"),
      new THREE.Color("#00ffff"),
      new THREE.Color("#ff6b9d"),
      new THREE.Color("#7c3aed"),
      new THREE.Color("#22d3ee"),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      siz[i] = Math.random() * 0.06 + 0.02;
    }
    return [pos, col, siz];
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export function ThreeBackground() {
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const v = Math.max(0, 0.5 - scrollY / 800);
      setOpacity(v);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity }}>
      <Canvas camera={{ position: [0, 0.5, 5.5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#d4a853" />
        <pointLight position={[-4, 3, 3]} intensity={0.4} color="#00ffff" />
        <pointLight position={[3, -3, 4]} intensity={0.3} color="#ff6b9d" />
        <Sparkles count={30} scale={12} size={0.8} speed={0.3} opacity={0.15} color="#d4a853" />
        <OrbitRing radius={2} color="#d4a853" />
        <OrbitRing radius={2.8} color="#00ffff" />
        <TechKnot />
        <OrbitingShape radius={2} speed={0.4} color="#00ffff" geometry="icosahedron" offset={0} />
        <OrbitingShape radius={2.8} speed={-0.3} color="#ff6b9d" geometry="octahedron" offset={1.5} />
        <OrbitingShape radius={2.3} speed={0.5} color="#7c3aed" geometry="tetrahedron" offset={3} />
        <TechParticles />
      </Canvas>
    </div>
  );
}
