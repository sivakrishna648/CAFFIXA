import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CoffeeParticles = () => {
    const points = useRef();
    const count = 4000;

    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
            points.current.rotation.x = state.clock.getElapsedTime() * 0.01;
            // Subtle pulse to match the "life" in the video
            const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
            points.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#D4A373"
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const Hero = () => {
    return (
        <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/hero.png"
                    alt="Cinematic Coffee"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{ filter: 'brightness(0.6) contrast(1.2) saturate(0.8)' }}
                />

                {/* Cinematic Texture Overlays */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-60" />
            </div>

            {/* 3D Elements */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#c68369" />

                    <Suspense fallback={null}>
                        <CoffeeParticles />
                        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                            <mesh position={[2, -1, 0]} rotation={[0, -0.5, 0.2]}>
                                <sphereGeometry args={[0.5, 32, 32]} />
                                <MeshDistortMaterial
                                    color="#4a2c1d"
                                    speed={2}
                                    distort={0.4}
                                    radius={1}
                                />
                            </mesh>
                        </Float>
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <h1 className="text-7xl md:text-9xl font-premium font-bold tracking-[0.2em] mb-4 text-white uppercase">
                        Caffi<span className="text-coffee-500">xa</span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-2xl tracking-[0.4em] text-coffee-200 mb-12 uppercase"
                    >
                        Brewing the future of coffee
                    </motion.p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary"
                            >
                                SHOP COFFEE
                            </motion.button>
                        </Link>
                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-secondary"
                            >
                                EXPLORE OUR STORY
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center py-2">
                    <div className="w-1 h-2 bg-coffee-500 rounded-full" />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
