import React from 'react'

export function Wall2(props) {

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
    <meshPhongMaterial color="#ff0000" opacity={0} transparent />
  </mesh>
  )
}