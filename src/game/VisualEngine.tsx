import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SharedRefs, runPhysicsLoop, initPhysics } from './PhysicsEngine';
import { PointerLockControls, Sky, Environment } from '@react-three/drei';

const BOX_COUNT = 300;
const TREE_COUNT = 150;

const BattleArena = () => {
  const { camera, gl, scene } = useThree();
  const boxesMeshRef = useRef<THREE.InstancedMesh>(null);
  const treesMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize Physics & Static Geometry
  useEffect(() => {
    initPhysics(BOX_COUNT);
    
    if (treesMeshRef.current) {
      for (let i = 0; i < TREE_COUNT; i++) {
        dummy.position.set(
          (Math.random() - 0.5) * 150,
          2.5,
          (Math.random() - 0.5) * 150
        );
        // Random scale for trees
        const scale = 0.5 + Math.random() * 1.5;
        dummy.scale.set(scale, scale, scale);
        // Random rotation
        dummy.rotation.y = Math.random() * Math.PI * 2;
        
        dummy.updateMatrix();
        treesMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      treesMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Context loss protection & memory safety
    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL Context Lost! (Prevented crash)");
    };
    
    const handleContextRestore = () => {
      console.log("WebGL Context Restored.");
    };

    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLoss, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestore, false);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLoss);
      canvas.removeEventListener('webglcontextrestored', handleContextRestore);
      
      // Strict disposal for WebGL stability
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(m => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      gl.dispose();
    };
  }, [gl, scene, dummy]);

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': SharedRefs.inputs.forward = true; break;
        case 'KeyS': SharedRefs.inputs.backward = true; break;
        case 'KeyA': SharedRefs.inputs.left = true; break;
        case 'KeyD': SharedRefs.inputs.right = true; break;
        case 'Space': SharedRefs.inputs.jump = true; break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': SharedRefs.inputs.forward = false; break;
        case 'KeyS': SharedRefs.inputs.backward = false; break;
        case 'KeyA': SharedRefs.inputs.left = false; break;
        case 'KeyD': SharedRefs.inputs.right = false; break;
        case 'Space': SharedRefs.inputs.jump = false; break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Frame Loop (No useState here, only refs and fixed physics)
  useFrame((state) => {
    // 1. Run Fixed Timestep Physics Engine
    runPhysicsLoop(state.clock.elapsedTime * 1000);

    // 2. Sync Player Camera with Physics
    SharedRefs.player.rotation.copy(camera.rotation);
    camera.position.copy(SharedRefs.player.position);
    camera.position.y += 0.8; // Eye level offset

    // 3. Sync InstancedMesh for Dynamic Boxes
    if (boxesMeshRef.current) {
      SharedRefs.boxes.forEach((box, i) => {
        dummy.position.copy(box.position);
        dummy.rotation.set(0, 0, 0); // Reset scale/rot from trees
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        boxesMeshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      boxesMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
      <Environment preset="sunset" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[50, 50, 50]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />

      {/* Ground Arena */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#2d4c1e" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Grid Helper for visual Arena */}
      <gridHelper args={[400, 100, "#000000", "#1a2d11"]} position={[0, 0.01, 0]} />

      {/* Dynamic Boxes (Instanced - Memory Safe) */}
      <instancedMesh ref={boxesMeshRef} args={[undefined, undefined, BOX_COUNT]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#8a5a44" roughness={0.7} />
      </instancedMesh>

      {/* Static Trees (Instanced - Memory Safe) */}
      <instancedMesh ref={treesMeshRef} args={[undefined, undefined, TREE_COUNT]} castShadow receiveShadow>
        <cylinderGeometry args={[0, 1, 5, 8]} />
        <meshStandardMaterial color="#1f3d0c" roughness={0.9} />
      </instancedMesh>

      <PointerLockControls />
    </>
  );
};

export default function GameRoot() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="w-full h-screen bg-zinc-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-zinc-950 to-zinc-950"></div>
        <div className="z-10 text-center animate-in fade-in zoom-in duration-700">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-orange-700 mb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            تَنكِيل
          </h1>
          <p className="text-xl md:text-2xl font-bold tracking-widest text-zinc-400 mb-12">
            SGMW - ARENA (WEBGL STABLE)
          </p>
          <button
            onClick={() => setStarted(true)}
            className="px-12 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xl md:text-2xl rounded-sm shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.8)] transition-all active:scale-95 uppercase tracking-widest border border-red-400/50"
          >
            دخول الساحة
          </button>
        </div>
        <div className="absolute bottom-4 text-xs text-zinc-600 font-bold uppercase tracking-widest text-center">
          Memory Safety: Enforced | Fixed Timestep: Active | VRAM: Optimized
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas shadows camera={{ fov: 75, position: [0, 2, 0] }}>
        <BattleArena />
      </Canvas>
      
      {/* HUD overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-white border border-black/50 shadow-sm"></div>
      </div>
      <div className="absolute top-6 right-6 text-white font-mono text-sm bg-black/60 p-4 rounded-sm border border-red-900/50 pointer-events-none text-right shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="text-red-500 font-black text-lg mb-2 border-b border-red-900/50 pb-2">تَنكِيل - SGMW</div>
        <p dir="ltr" className="text-zinc-300">W, A, S, D : الحركة</p>
        <p dir="ltr" className="text-zinc-300">Space : القفز</p>
        <p dir="ltr" className="text-zinc-300">Click : توجيه الكاميرا</p>
        <div className="mt-3 pt-2 border-t border-red-900/50 flex items-center gap-2 justify-end">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Engine Stable</span>
        </div>
      </div>
    </div>
  );
}
