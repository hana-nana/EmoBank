import React from 'react'
import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";

export function Wall(props) {
  const texture = useLoader(THREE.TextureLoader, "/assets/wall.png");
  // const [meshRef] = usePlane(
  //   () => ({ args: [15, 15], mass: 1, type: 'Static', ...props}),
  // )

  return (
    <mesh
    {...props}
    // ref={meshRef} 
    receiveShadow
    >
    <boxGeometry attach="geometry" rotation={[5, 15, 0]} position= {[10,0,0]} args={[15, 1, 8]} />
    <meshPhongMaterial opacity={1} transparent map={texture} />
  </mesh>
  )
}