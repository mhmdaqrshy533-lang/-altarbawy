import * as THREE from 'three';

// Shared state between React and Physics (No useState allowed here)
export const SharedRefs = {
  player: {
    position: new THREE.Vector3(0, 2, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    isGrounded: false,
  },
  boxes: [] as { position: THREE.Vector3, velocity: THREE.Vector3 }[],
  inputs: {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  }
};

const GRAVITY = -30;
const SPEED = 15;
const JUMP_FORCE = 12;
const TIME_STEP = 1 / 60;
let accumulator = 0;
let lastTime = performance.now();

export const initPhysics = (boxCount: number) => {
  SharedRefs.player.position.set(0, 2, 0);
  SharedRefs.player.velocity.set(0, 0, 0);
  
  SharedRefs.boxes = Array.from({ length: boxCount }).map(() => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 80,
      10 + Math.random() * 40,
      (Math.random() - 0.5) * 80
    ),
    velocity: new THREE.Vector3(0, 0, 0)
  }));
};

const updatePhysics = (dt: number) => {
  const p = SharedRefs.player;
  
  // Player movement
  const moveDir = new THREE.Vector3(0, 0, 0);
  if (SharedRefs.inputs.forward) moveDir.z -= 1;
  if (SharedRefs.inputs.backward) moveDir.z += 1;
  if (SharedRefs.inputs.left) moveDir.x -= 1;
  if (SharedRefs.inputs.right) moveDir.x += 1;
  
  if (moveDir.lengthSq() > 0) moveDir.normalize();
  moveDir.applyEuler(new THREE.Euler(0, p.rotation.y, 0));
  
  p.position.x += moveDir.x * SPEED * dt;
  p.position.z += moveDir.z * SPEED * dt;
  
  // Gravity & Jump
  if (!p.isGrounded) {
    p.velocity.y += GRAVITY * dt;
  }
  
  if (SharedRefs.inputs.jump && p.isGrounded) {
    p.velocity.y = JUMP_FORCE;
    p.isGrounded = false;
  }
  
  p.position.y += p.velocity.y * dt;
  
  // Floor collision (assuming y=1 is floor level for player center)
  if (p.position.y <= 2) {
    p.position.y = 2;
    p.velocity.y = 0;
    p.isGrounded = true;
  }
  
  // Update boxes physics (falling)
  SharedRefs.boxes.forEach(box => {
    box.velocity.y += GRAVITY * dt;
    box.position.y += box.velocity.y * dt;
    // Floor level for boxes (center of 2x2x2 box is y=1)
    if (box.position.y <= 1) {
      box.position.y = 1;
      box.velocity.y = 0;
    }
  });
};

export const runPhysicsLoop = (time: number) => {
  const frameTime = (time - lastTime) / 1000;
  lastTime = time;
  accumulator += Math.min(frameTime, 0.25); // Cap to avoid spiral of death
  
  while (accumulator >= TIME_STEP) {
    updatePhysics(TIME_STEP);
    accumulator -= TIME_STEP;
  }
};
