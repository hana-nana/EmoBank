import React from 'react'
import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";
// import { usePlane } from "@react-three/cannon";

export function Ground(props) {
  const texture = useLoader(THREE.TextureLoader, "/assets/floor.png");
  // const [meshRef] = usePlane(
  //   () => ({ args: [15, 15], mass: 1, type: 'Static', ...props}),
  // )

  return (
    <mesh
    {...props}
    // ref={meshRef} 
    receiveShadow
    >
    <boxGeometry attach="geometry" rotation={[5, 15, 0]} position= {[10,0,0]} args={[15, 1, 15]} />
    <meshPhongMaterial color="#cccccc" opacity={1} transparent map={texture} />
  </mesh>
  )
}