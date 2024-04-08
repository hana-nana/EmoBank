import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Over1(props) {
  const meshRef = useRef()

  return(
    <mesh
      {...props}
      ref={meshRef}
      scale={2}
    >
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshPhongMaterial opacity={0} transparent  />
    </mesh>
  );
}
export default Over1;
